import { test, expect } from '@playwright/test';
import pages from './pages/page.pages.ts';
import urls from './constants/urls.ts';
import { validCreds, invalidCreds } from './constants/credentials.ts';

test.describe('main page', () => {

  test('book room with valid data', async ({ page }) => {
    const mainPage = pages.mainPage(page);
    const roomPage = pages.roomPage(page);
    
    await pages.basePage(page).moveToUrl(urls.loginPageUrl);

    await mainPage.checkVisibility(mainPage.checkInInput);
    await mainPage.checkVisibility(mainPage.checkOutInput);

    const checkInDate = mainPage.getFormattedDate(0);
    const checkOutDate = mainPage.getFormattedDate(2);

    await mainPage.fillValue(mainPage.checkInInput, checkInDate);
    await mainPage.fillValue(mainPage.checkOutInput, checkOutDate);

    await mainPage.clickButton(mainPage.checkAvailabilityBtn);

    await Promise.all([
      page.waitForResponse(resp => resp.url().includes('/reservation') && resp.status() === 200),
      mainPage.goToReservationRoom(1, checkInDate, checkOutDate)
    ]);

    await mainPage.goToReservationRoom(2, checkInDate, checkOutDate);

    await roomPage.clickOpenForm();

    await roomPage.fillReservationForm(
      validCreds[1].firstName,
      validCreds[1].lastName,
      validCreds[1].email,
      validCreds[1].phone
    );

    await roomPage.clickSubmitForm();

    await roomPage.verifyBookingConfirmedAndReturnHome();
    
  });

  test('book room with invalid data', async ({ page }) => {
    const mainPage = pages.mainPage(page);
    const roomPage = pages.roomPage(page);
    
    await pages.basePage(page).moveToUrl(urls.loginPageUrl);

    await mainPage.checkVisibility(mainPage.checkInInput);
    await mainPage.checkVisibility(mainPage.checkOutInput);

    const checkInDate = mainPage.getFormattedDate(0);
    const checkOutDate = mainPage.getFormattedDate(2);

    await mainPage.fillValue(mainPage.checkInInput, checkInDate);
    await mainPage.fillValue(mainPage.checkOutInput, checkOutDate);

    await mainPage.clickButton(mainPage.checkAvailabilityBtn);

    await Promise.all([
      page.waitForResponse(resp => resp.url().includes('/reservation') && resp.status() === 200),
      mainPage.goToReservationRoom(1, checkInDate, checkOutDate)
    ]);

    await mainPage.goToReservationRoom(3, checkInDate, checkOutDate);

    await roomPage.clickOpenForm();

    await roomPage.fillReservationForm(
      invalidCreds[0].firstName,
      invalidCreds[0].lastName,
      invalidCreds[0].email,
      invalidCreds[0].phone
    );

    await roomPage.clickSubmitForm();

    await roomPage.verifyFormErrorMessagesVisible();
    
  });

  test('check that the earlier booked dates show as Unavailable', async ({ page }) => {
    
    const mainPage = pages.mainPage(page);
    const roomPage = pages.roomPage(page);
    
    await pages.basePage(page).moveToUrl(urls.loginPageUrl);

    await mainPage.checkVisibility(mainPage.checkInInput);
    await mainPage.checkVisibility(mainPage.checkOutInput);

    const checkInDate = mainPage.getFormattedDate(0);
    const checkOutDate = mainPage.getFormattedDate(2);

    await mainPage.fillValue(mainPage.checkInInput, checkInDate);
    await mainPage.fillValue(mainPage.checkOutInput, checkOutDate);

    await mainPage.clickButton(mainPage.checkAvailabilityBtn);

    await Promise.all([
      page.waitForResponse(resp => resp.url().includes('/reservation') && resp.status() === 200),
      mainPage.goToReservationRoom(1, checkInDate, checkOutDate)
    ]);

    await mainPage.goToReservationRoom(2, checkInDate, checkOutDate);

    await roomPage.clickOpenForm();

    await roomPage.fillReservationForm(
      validCreds[1].firstName,
      validCreds[1].lastName,
      validCreds[1].email,
      validCreds[1].phone
    );

    await roomPage.clickSubmitForm();

    await page.waitForTimeout(6000);

    await roomPage.verifyApplicationError();
  });

});
