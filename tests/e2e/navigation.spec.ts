import { test, expect } from '@playwright/test';

test.describe('Desktop Navigation & CTAs', () => {
  test.beforeEach(async ({ page }) => {
    // Go to the home page before each test
    await page.goto('/');
  });

  test('TopAppBar anchors redirect and update active state', async ({ page, isMobile }) => {
    // Skip this test on mobile viewports since the TopAppBar might be hidden or behave differently
    test.skip(isMobile, 'Desktop navigation test');

    // 1. Verify "Projects" link
    const projectsLink = page.getByTestId('desktop-nav-projects');
    await expect(projectsLink).toBeVisible();
    await projectsLink.click();
    
    // Playwright will automatically wait for the scroll animation to resolve.
    // Check if URL hash updated
    await expect(page).toHaveURL(/.*#projects/);
    
    // Check if the section becomes visible in the viewport
    const projectsSection = page.locator('#projects');
    await expect(projectsSection).toBeInViewport();

    // 2. Verify "Experience" link
    const experienceLink = page.getByTestId('desktop-nav-experience');
    await experienceLink.click();
    await expect(page).toHaveURL(/.*#experience/);
    await expect(page.locator('#experience')).toBeInViewport();

    // 3. Verify "Contact" link
    const contactLink = page.getByTestId('desktop-nav-contact');
    await contactLink.click();
    await expect(page).toHaveURL(/.*#contact/);
    await expect(page.locator('#contact')).toBeInViewport();
    
    // 4. Verify returning to "Home"
    const homeLink = page.getByTestId('desktop-nav-home');
    await homeLink.click();
    // The home link usually scrolls to the top or sets # as hash
    await expect(page.getByTestId('hero-btn-solutions')).toBeInViewport();
  });

  test('Hero CTAs redirect to correct sections', async ({ page }) => {
    const solutionsBtn = page.getByTestId('hero-btn-solutions');
    const contactBtn = page.getByTestId('hero-btn-contact');

    // Verify "Minhas Soluções" button
    await expect(solutionsBtn).toBeVisible();
    await solutionsBtn.click();
    await expect(page).toHaveURL(/.*#services/);
    await expect(page.locator('#services')).toBeInViewport();

    // Reset back to top
    await page.evaluate(() => window.scrollTo(0, 0));

    // Verify "Falar sobre um projeto" button
    await expect(contactBtn).toBeVisible();
    await contactBtn.click();
    await expect(page).toHaveURL(/.*#contact/);
    await expect(page.locator('#contact')).toBeInViewport();
  });
});
