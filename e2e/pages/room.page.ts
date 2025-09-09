import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './base.page';

export class RoomPage extends BasePage {
  readonly openFormBtn: Locator;

  readonly submitFormBtn: Locator;

  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly emailInput: Locator;
  readonly phoneInput: Locator;

  readonly bookingConfirmedText: Locator;
  readonly returnHomeBtn: Locator;

  readonly applicationErrorText: Locator;

  readonly formErrorAlert: Locator;
  readonly formErrorItems: Locator;

  constructor(page: Page) {
    super(page);

    this.openFormBtn = this.page.locator('button#doReservation', { hasText: 'Reserve Now' });

    this.submitFormBtn = this.page.locator('button.btn.btn-primary.w-100.mb-3:not([id])', { hasText: 'Reserve Now' });

    this.firstNameInput = this.page.locator('input.room-firstname[name="firstname"]');
    this.lastNameInput = this.page.locator('input.room-lastname[name="lastname"]');
    this.emailInput = this.page.locator('input.room-email[name="email"]');
    this.phoneInput = this.page.locator('input.room-phone[name="phone"]');

    this.bookingConfirmedText = this.page.locator('h2.card-title', { hasText: 'Booking Confirmed' });
    this.returnHomeBtn = this.page.locator('a.btn.btn-primary.w-100.mb-3.mt-3', { hasText: 'Return home' });

    this.applicationErrorText = this.page.locator('h2', { hasText: 'Application error: a client-side exception has occurred while loading automationintesting.online' });
  
    this.formErrorAlert = this.page.locator('div.alert.alert-danger[role="alert"]');
    this.formErrorItems = this.formErrorAlert.locator('ul > li');
    }

  async clickOpenForm(): Promise<void> {
    await expect(this.openFormBtn).toBeVisible();
    await this.openFormBtn.click();
  }

  async fillReservationForm(firstName: string, lastName: string, email: string, phone: string): Promise<void> {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.emailInput.fill(email);
    await this.phoneInput.fill(phone);
  }

  async clickSubmitForm(): Promise<void> {
    await expect(this.submitFormBtn).toBeVisible();
    await this.submitFormBtn.click();
  }

   async verifyBookingConfirmedAndReturnHome(): Promise<void> {
    await expect(this.bookingConfirmedText).toBeVisible();
    await expect(this.returnHomeBtn).toBeVisible();

    await this.returnHomeBtn.click();
  }

   async verifyApplicationError(): Promise<void> {
    const isVisible = await this.applicationErrorText.isVisible();
    if (isVisible) {
      console.log('Application error detected: room is not available for booking.');
    } else {
      console.log('No application error detected.');
    }
    expect(isVisible).toBe(true);
  }

  async verifyFormErrorMessagesVisible(): Promise<void> {
  await this.page.waitForLoadState('domcontentloaded');

  const formErrorAlert = this.page.locator('div.alert.alert-danger[role="alert"]');
  const formErrorItems = formErrorAlert.locator('ul > li');

  await expect(formErrorAlert).toBeVisible();

  const count = await formErrorItems.count();
  console.log(`Found ${count} form error messages:`);

  for (let i = 0; i < count; i++) {
    const text = await formErrorItems.nth(i).textContent();
    console.log(` - ${text}`);
    await expect(formErrorItems.nth(i)).toBeVisible();
  }
}

}