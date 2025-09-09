import { APIRequestContext, request } from '@playwright/test';

export interface RoomData {
  roomName: string;
  type: string;
  accessible: boolean;
  description: string;
  image: string;
  roomPrice: string;
  features: string[];
}

export class AdminAPI {
  private requestContext!: APIRequestContext;
  private token = 'g7LBci9iSHvDwRey';

  async init(): Promise<void> {
    this.requestContext = await request.newContext({
      extraHTTPHeaders: {
        'Accept': '*/*',
        'Content-Type': 'application/json',
        'Cookie': `token=${this.token}`,
      },
    });
  }

    async createRoom(room?: Partial<RoomData>): Promise<RoomData> {
    if (!this.token) throw new Error('You must login first');

    const uniqueRoomName = room?.roomName || `room-${Date.now()}`;

    const payload: RoomData = {
        roomName: uniqueRoomName,
        type: room?.type || 'Family',
        accessible: room?.accessible ?? true,
        description: room?.description || 'Please enter a description for this room',
        image: room?.image || 'https://www.mwtestconsultancy.co.uk/img/room1.jpg',
        roomPrice: room?.roomPrice || '400',
        features: room?.features || ['WiFi', 'TV'],
    };

    const response = await this.requestContext.post('https://automationintesting.online/api/room', {
        data: payload,
        headers: {
        'Accept': '*/*',
        'Content-Type': 'application/json',
        'Cookie': `token=${this.token}`,
        },
    });

    if (!response.ok()) {
        const text = await response.text();
        throw new Error(`Create room failed: ${response.status()} ${response.statusText()} - ${text}`);
    }

    const data = await response.json();
    console.log('Room created:', data);

    return payload;
    }

  async getRooms() {
    if (!this.requestContext) await this.init();
    const response = await this.requestContext.get('https://automationintesting.online/api/room');
    if (!response.ok()) throw new Error(`Get rooms failed: ${response.status()}`);
    return await response.json();
  }

  async deleteRoom(roomId: number) {
    if (!this.requestContext) await this.init();
    const response = await this.requestContext.delete(`https://automationintesting.online/api/room/${roomId}`);
    if (!response.ok()) throw new Error(`Delete room failed: ${response.status()}`);
  }
}
