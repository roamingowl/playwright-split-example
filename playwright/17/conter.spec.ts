import { test, expect } from '@playwright/test';

test.describe('Counter Page', () => {
    async function openPage(page) {
        // cy.visit("http://localhost:3000");
        await page.goto(process.env['NEXT_APP_URL']);
        await page.locator('[data-test-name=sidebar-hamburger]').click();
        await page.locator('[data-sidebar-link-name=counter]').click();
    }

    test('displays counter and two buttons', async ({ page }) => {
        await openPage(page);
        await expect(page.locator('[data-test-name=counter-title]')).toHaveText(
            'Count'
        );
        await expect(page.locator('[data-test-name=count-number]')).toHaveText('0');
        await expect(page.locator('[data-test-name=count-up]')).toBeEnabled();
        await expect(page.locator('[data-test-name=count-down]')).toBeDisabled();
    });

    test('count up', async ({ page }) => {
        await openPage(page);
        for (let i = 0; i < 3; i++) {
            await expect(page.locator('[data-test-name=count-number]')).toHaveText(
                `${i}`
            );
            await page.locator('[data-test-name=count-up]').click();
        }
        await expect(page.locator('[data-test-name=count-up]')).toBeEnabled();
        await expect(page.locator('[data-test-name=count-down]')).toBeEnabled();
    });

    test('count up and down', async ({ page }) => {
        await openPage(page);
        await expect(page.locator('[data-test-name=count-number]')).toHaveText(`0`);
        await page.locator('[data-test-name=count-up]').click();
        await expect(page.locator('[data-test-name=count-number]')).toHaveText(`1`);
        await expect(page.locator('[data-test-name=count-up]')).toBeEnabled();
        await expect(page.locator('[data-test-name=count-down]')).toBeEnabled();
        await page.locator('[data-test-name=count-down]').click();
        await expect(page.locator('[data-test-name=count-number]')).toHaveText(`0`);
        await expect(page.locator('[data-test-name=count-down]')).toBeDisabled();
    });
});
