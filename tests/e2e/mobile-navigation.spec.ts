import { test, expect } from '@playwright/test';

test.describe('Mobile Navigation (BottomNavBar)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('BottomNavBar is visible on mobile and links work', async ({ page, isMobile }) => {
    // Only run this test on screens smaller than 768px (Tailwind md breakpoint)
    const viewport = page.viewportSize();
    test.skip(!viewport || viewport.width >= 768, 'Mobile navigation test only (width < 768px)');

    // Verify the desktop navigation is hidden (by checking the toggle button or side nav)
    // Actually, in the current design, SideNav is hidden `hidden md:flex`, 
    // so we just verify the mobile nav links are visible.
    
    const mobileProjectsLink = page.getByTestId('mobile-nav-projects');
    await expect(mobileProjectsLink).toBeVisible();
    
    // Click and verify routing
    await mobileProjectsLink.click();
    await expect(page).toHaveURL(/.*#projects/);
    await expect(page.locator('#projects')).toBeInViewport();
    
    const mobileContactLink = page.getByTestId('mobile-nav-contact');
    await expect(mobileContactLink).toBeVisible();
    await mobileContactLink.click();
    await expect(page).toHaveURL(/.*#contact/);
    await expect(page.locator('#contact')).toBeInViewport();
  });
});
