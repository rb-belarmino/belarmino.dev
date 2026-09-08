import * as dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })

import { neon } from '@neondatabase/serverless'
import { drizzle } from 'drizzle-orm/neon-http'
import * as bcrypt from 'bcryptjs'
import * as schema from './schema'
import { adminUsers, providerSettings } from './schema'
import { eq } from 'drizzle-orm'

async function seed() {
  const connectionString = process.env.DATABASE_URL
  if (!connectionString) {
    console.error('❌ DATABASE_URL não configurada em .env.local')
    process.exit(1)
  }

  const sql = neon(connectionString)
  const db = drizzle(sql, { schema })

  console.log('🌱 Iniciando seed do banco de dados...')

  const initialUsername = process.env.INITIAL_ADMIN_USERNAME || 'admin'
  const initialPassword = process.env.INITIAL_ADMIN_PASSWORD || 'admin123'

  // 1. Seed Admin User
  const existingUsers = await db
    .select()
    .from(adminUsers)
    .where(eq(adminUsers.username, initialUsername))
  if (existingUsers.length === 0) {
    const passwordHash = await bcrypt.hash(initialPassword, 10)
    await db.insert(adminUsers).values({
      username: initialUsername,
      passwordHash
    })
    console.log(`✅ Usuário administrador criado: ${initialUsername}`)
  } else {
    console.log(`ℹ️ Usuário administrador ${initialUsername} já existe.`)
  }

  // 2. Seed Default Provider Settings
  const existingSettings = await db.select().from(providerSettings)
  if (existingSettings.length === 0) {
    await db.insert(providerSettings).values({
      fullName: 'Rodrigo Belarmino',
      document: '000.000.000-00',
      cityState: 'São Paulo - SP',
      email: 'contato@belarmino.dev',
      pixKey: 'contato@belarmino.dev',
      phone: '(11) 99999-9999'
    })
    console.log('✅ Configurações padrão do prestador criadas.')
  } else {
    console.log('ℹ️ Configurações do prestador já configuradas.')
  }

  console.log('✨ Seed concluído com sucesso!')
}

seed().catch(err => {
  console.error('❌ Erro durante o seed:', err)
  process.exit(1)
})
