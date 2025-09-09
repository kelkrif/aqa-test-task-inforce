import { test, expect } from '@playwright/test';
import { AdminAPI, RoomData } from './api/rest.ts';

test.describe('Admin API Room Tests', () => {

  test('Create a Room using the Admin page(API) and check that the room was created on the User page(API)', async () => {
    const adminApi = new AdminAPI();

    await adminApi.init();

    const uniqueRoomName = `room-${Date.now()}`;

    const newRoom: RoomData = {
      roomName: uniqueRoomName,
      type: 'Family',
      accessible: true,
      description: 'Test room created via API',
      image: 'https://www.mwtestconsultancy.co.uk/img/room1.jpg',
      roomPrice: '400',
      features: ['WiFi', 'TV'],
    };

    const createdData = await adminApi.createRoom(newRoom);

    const rooms = await adminApi.getRooms();

    const createdRoom = rooms.find((r: any) => r.roomName === uniqueRoomName);
    expect(createdRoom).toBeDefined();
    expect(createdRoom.description).toBe(newRoom.description);
    expect(createdRoom.roomPrice).toBe(newRoom.roomPrice);

    console.log('Room creation verified on User API:', createdRoom);

    if (createdRoom?.id) {
      await adminApi.deleteRoom(createdRoom.id);
      console.log('Room deleted after test');
    }
  });

});
