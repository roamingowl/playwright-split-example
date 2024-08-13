import { test, expect } from '@playwright/test';

test.describe('Items List Page', () => {
    async function openPage(page) {
        // cy.visit("http://localhost:3000");
        await page.goto(process.env['NEXT_APP_URL']);
        await page.locator('[data-test-name=sidebar-hamburger]').click();
        await page.locator('[data-sidebar-link-name=itemslist]').click();
    }

    async function addItem(page) {
        await page.locator('[data-test-name=add-item-button]').click();
    }

    test('displays list with enabled add button', async ({ page }) => {
        await openPage(page);
        await expect(page.locator('[data-test-name=page-title]')).toHaveText(
            'List of items'
        );
        await expect(
            page.locator('[data-test-name=items-list]').locator('li.MuiListItem-root')
        ).toHaveCount(0);
        await expect(page.locator('[data-test-name=items-count]')).toHaveText(
            'Current count: 0'
        );
        await expect(
            page.locator('[data-test-name=add-item-button]')
        ).toBeEnabled();
    });

    test('add button adds an item', async ({ page }) => {
        await openPage(page);
        for (let i = 0; i < 3; i++) {
            await addItem(page);
            await expect(
                page
                    .locator('[data-test-name=items-list]')
                    .locator('li.MuiListItem-root')
            ).toHaveCount(i + 1);
            await expect(
            await page
                .locator('[data-test-name=items-list]')
                .locator(`[data-test-name=list-item-${i}]`))
                .toHaveText(`Item ${i + 1}`);
                // .FIXME_should('contain.text', );
            await expect(
                page
                    .locator('[data-test-name=items-list]')
                    .locator(`[data-test-name=list-item-${i}]`)
                    .locator('button')
            ).toBeVisible();
            await expect(page.locator('[data-test-name=items-count]')).toHaveText(
                `Current count: ${i + 1}`
            );
        }
    });

    test('remove button removes an item', async ({ page }) => {
        await openPage(page);
        await addItem(page);
        await page
            .locator('[data-test-name=items-list]')
            .locator('[data-test-name=list-item-0]')
            .locator('button')
            .click();
        await expect(
            page.locator('[data-test-name=items-list]').locator('li.MuiListItem-root')
        ).toHaveCount(0);
        await expect(page.locator('[data-test-name=items-count]')).toHaveText(
            'Current count: 0'
        );
    });
});
