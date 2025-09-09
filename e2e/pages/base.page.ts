import { Page, Locator, expect } from '@playwright/test';

export class BasePage {
  readonly page: Page;
  
  constructor(page: Page) {
    this.page = page;
  }

  async moveToUrl(url: string): Promise<void> {
    await this.page.goto(url);
  }

  async clickButton(locator: Locator): Promise<void> {
    await locator.click();
  }

  async fillValue(locator: Locator, value: string): Promise<void> {
    await locator.fill(value);
  }

  async checkVisibility(locator: Locator): Promise<void> {
    await expect(locator).toBeVisible();
  }

  

}