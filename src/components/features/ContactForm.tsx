"use client";

import { useTranslations, useLocale } from "next-intl";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState } from "react";

const formSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  message: z.string().min(10),
});

type FormData = z.infer<typeof formSchema>;

export function ContactForm() {
  const t = useTranslations("Contact");
  const locale = useLocale();
  const isEn = locale === "en";
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormData) => {
    setStatus("submitting");
    try {
      const response = await fetch("https://formspree.io/f/my-dummy-endpoint", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        setStatus("success");
        reset();
      } else {
        setStatus("error");
      }
    } catch (err) {
      setStatus("error");
    }
  };

  return (
    <div className="w-full flex flex-col items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl bg-white/[0.03] backdrop-blur-md border border-white/10 rounded-xl p-8 md:p-12 shadow-2xl relative overflow-hidden"
      >
        {/* Decorative corner elements */}
        <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-primary/50"></div>
        <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-primary/50"></div>
        <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-primary/50"></div>
        <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-primary/50"></div>
        
        <h1 className="font-display font-bold text-3xl md:text-4xl text-primary mb-2">
          {isEn ? "INITIALIZE_CONTACT" : "INICIALIZAR_CONTATO"}
        </h1>
        <p className="font-sans text-base text-on-surface-variant mb-12">
          {isEn ? "Transmit data packet to establishing secure connection." : "Transmita o pacote de dados para estabelecer conexão segura."}
        </p>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="relative group">
            <label className="block font-mono text-sm text-primary mb-1 transition-all group-focus-within:text-primary-fixed" htmlFor="name">
              {isEn ? "NAME_ID" : "ID_NOME"}
            </label>
            <input 
              {...register("name")}
              className="w-full bg-black border border-[#1A1A1B] text-on-surface font-sans text-base rounded px-4 py-3 focus:border-primary focus:shadow-[0_0_15px_rgba(0,243,255,0.3)] transition-all outline-none" 
              id="name" 
              placeholder={isEn ? "Enter identifier" : "Insira o identificador"} 
              type="text"
            />
            {errors.name && <span className="text-xs text-error mt-1">{errors.name.message}</span>}
          </div>
          
          <div className="relative group">
            <label className="block font-mono text-sm text-primary mb-1 transition-all group-focus-within:text-primary-fixed" htmlFor="email">
              {isEn ? "COMM_LINK" : "LINK_COMUNICAÇÃO"}
            </label>
            <input 
              {...register("email")}
              className="w-full bg-black border border-[#1A1A1B] text-on-surface font-sans text-base rounded px-4 py-3 focus:border-primary focus:shadow-[0_0_15px_rgba(0,243,255,0.3)] transition-all outline-none" 
              id="email" 
              placeholder={isEn ? "Enter coordinates" : "Insira as coordenadas"} 
              type="email"
            />
            {errors.email && <span className="text-xs text-error mt-1">{errors.email.message}</span>}
          </div>
          
          <div className="relative group">
            <label className="block font-mono text-sm text-primary mb-1 transition-all group-focus-within:text-primary-fixed" htmlFor="message">
              {isEn ? "PAYLOAD" : "CARGA_ÚTIL"}
            </label>
            <textarea 
              {...register("message")}
              className="w-full bg-black border border-[#1A1A1B] text-on-surface font-sans text-base rounded px-4 py-3 focus:border-primary focus:shadow-[0_0_15px_rgba(0,243,255,0.3)] transition-all outline-none resize-none" 
              id="message" 
              placeholder={isEn ? "Enter data transmission" : "Insira a transmissão de dados"} 
              rows={4}
            ></textarea>
            {errors.message && <span className="text-xs text-error mt-1">{errors.message.message}</span>}
          </div>
          
          <button 
            type="submit" 
            disabled={status === "submitting"}
            className="w-full bg-primary text-black font-mono text-xs font-bold tracking-widest py-4 px-6 rounded hover:shadow-[0_0_20px_rgba(0,243,255,0.2)] hover:-translate-y-[2px] transition-all flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined">send</span>
            {status === "submitting" ? (isEn ? "TRANSMITTING..." : "TRANSMITINDO...") : (isEn ? "TRANSMIT" : "TRANSMITIR")}
          </button>
          
          {status === "success" && <p className="text-primary text-sm text-center mt-4">{t("success")}</p>}
          {status === "error" && <p className="text-error text-sm text-center mt-4">{t("error")}</p>}
        </form>
        
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col items-center gap-6">
          <p className="font-mono text-sm text-on-surface-variant">
            {isEn ? "OR CONNECT VIA EXTERNAL NODES" : "OU CONECTE VIA NÓS EXTERNOS"}
          </p>
          <div className="flex gap-6">
            <a href="https://github.com/rodrigobelarmino" target="_blank" rel="noreferrer" className="w-12 h-12 rounded-full border border-primary/30 flex items-center justify-center text-primary hover:bg-primary/10 hover:border-primary hover:shadow-[0_0_15px_rgba(0,243,255,0.3)] transition-all group">
              <span className="material-symbols-outlined group-hover:scale-110 transition-transform">code</span>
            </a>
            <a href="https://linkedin.com/in/rodrigobelarmino" target="_blank" rel="noreferrer" className="w-12 h-12 rounded-full border border-primary/30 flex items-center justify-center text-primary hover:bg-primary/10 hover:border-primary hover:shadow-[0_0_15px_rgba(0,243,255,0.3)] transition-all group">
              <span className="material-symbols-outlined group-hover:scale-110 transition-transform">work</span>
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
