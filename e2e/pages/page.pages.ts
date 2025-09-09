import { Page } from '@playwright/test';
import { BasePage } from './base.page.ts';
import { MainPage } from './main.page.ts';
import { RoomPage } from './room.page.ts';

export const pages = {
  basePage: (page: Page) => new BasePage(page),
  mainPage: (page: Page) => new MainPage(page),
  roomPage: (page: Page) => new RoomPage(page),

};

export default pages;