import { test, expect } from '@playwright/test';

test.describe('Internationalization (i18n)', () => {
  test('Language toggle switches content between PT and EN', async ({ page }) => {
    // Start at Portuguese (default depending on browser locale, but let's assume / defaults to PT)
    await page.goto('/');
    
    // Check initial language state by reading the hero CTA text
    const solutionsBtn = page.getByTestId('hero-btn-solutions');
    
    // We expect the button to have either 'MINHAS SOLUÇÕES' or 'MY SOLUTIONS'
    // Since Next.js might auto-detect the Playwright runner locale (en-US by default),
    // we'll check what it is and then toggle it to see if it changes.
    const initialText = await solutionsBtn.innerText();
    
    // Find the toggle button
    const langToggle = page.getByTestId('lang-toggle');
    await expect(langToggle).toBeVisible();
    
    // Click to toggle language
    await langToggle.click();
    
    // Wait for the new page to load or re-render
    await page.waitForLoadState('networkidle');
    
    // Re-select the button because DOM might have re-rendered
    const toggledSolutionsBtn = page.getByTestId('hero-btn-solutions');
    const toggledText = await toggledSolutionsBtn.innerText();
    
    // The text must have changed after clicking the toggle
    expect(toggledText).not.toBe(initialText);
    
    // Specifically check for our known strings
    if (initialText.includes('MY SOLUTIONS')) {
      expect(toggledText).toContain('MINHAS SOLUÇÕES');
    } else {
      expect(toggledText).toContain('MY SOLUTIONS');
    }
  });
});
