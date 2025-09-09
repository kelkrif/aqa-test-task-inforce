import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './base.page';

export class MainPage extends BasePage {
  readonly header: Locator;
  readonly checkInInput: Locator;
  readonly checkOutInput: Locator;
  readonly checkAvailabilityBtn: Locator;
  readonly roomCards: Locator;
  readonly bookNowButtons: Locator;

  constructor(page: Page) {
    super(page);

    this.header = this.page.locator('.card-body > h3.card-title');

    this.checkInInput = this.page.locator('label[for="checkin"]')
      .locator('xpath=following-sibling::div//input[@class="form-control"]');
    this.checkOutInput = this.page.locator('label[for="checkout"]')
      .locator('xpath=following-sibling::div//input[@class="form-control"]');
    this.checkAvailabilityBtn = this.page.locator('button.btn.btn-primary', { hasText: 'Check Availability' });

    this.roomCards = this.page.locator('.room-card');
    this.bookNowButtons = this.page.locator('a.btn.btn-primary', { hasText: 'Book now' });
  }

  getFormattedDate(offsetDays: number = 0): string {

    const date = new Date();
    date.setDate(date.getDate() + offsetDays);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  }

  async clickFirstBookNowButton(): Promise<void> {
    const roomCount = await this.roomCards.count();
    expect(roomCount).toBeGreaterThan(0);

    const firstRoom = this.roomCards.first();
    await expect(firstRoom).toBeVisible();

    const bookNowButton = firstRoom.locator('a.btn.btn-primary', { hasText: 'Book now' });
    await expect(bookNowButton).toBeVisible();

    await bookNowButton.click();
    console.log('Clicked on Book now button inside the first room card');
  }

  async goToHardcodedReservation(): Promise<void> {
    const fullUrl = 'https://automationintesting.online/reservation/1?checkin=2025-09-09&checkout=2025-09-10';
    console.log('Navigating to hardcoded reservation URL:', fullUrl);

    await this.page.goto(fullUrl, { waitUntil: 'load' });

    await this.page.waitForSelector('h3.card-title', { state: 'visible' });

    console.log('Reservation page loaded successfully');
  }

  async goToReservationRoom(roomNumber: number, checkIn: string, checkOut: string): Promise<void> {
    const baseUrl = 'https://automationintesting.online';

    const formatDateForUrl = (dateStr: string) => {
      const [day, month, year] = dateStr.split('/');
      return `${year}-${month}-${day}`;
    };

    const checkInUrl = formatDateForUrl(checkIn);
    const checkOutUrl = formatDateForUrl(checkOut);

    const reservationPath = `/reservation/${roomNumber}?checkin=${checkInUrl}&checkout=${checkOutUrl}`;
    const fullUrl = `${baseUrl}${reservationPath}`;

    console.log('Navigating to reservation URL:', fullUrl);

    await this.page.goto(fullUrl, { waitUntil: 'load' });

    await this.page.waitForSelector('h3.card-title', { state: 'visible' });

    console.log('Reservation page loaded successfully');
  }

}
