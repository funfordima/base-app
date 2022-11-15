import { LocalStorageService } from './local-storage.service';

describe('LocalStorageService', () => {
  let service: LocalStorageService;

  beforeEach(() => {
    service = new LocalStorageService();
  });

  beforeEach(() => {
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#set/get item', () => {
    it('should save data value in local storage', () => {
      const mockData = 'mockData';
      const itemKey = 'itemKey';
      service.setItem(itemKey, mockData);
      expect(service.getItem(itemKey)).toBe(mockData);
    });
  });

  describe('#set/get JSON item', () => {
    it('should save object in local storage', () => {
      const itemKey = 'itemKey';
      const itemValue = { first: '1', second: '2' };
      service.setJSONItem(itemKey, itemValue);
      expect(service.getJSONItem(itemKey)).toEqual(itemValue);
    });

    it('should return empty value if there is no key in local storage', () => {
      const itemKey = 'itemKey';
      expect(service.getItem(itemKey)).toEqual(null);
    });
  });

  describe('#removeItem', () => {
    it('should remove item from storage', () => {
      const itemKey = 'itemKey';
      service.setItem(itemKey, 'mockData');
      service.removeItem(itemKey);
      expect(service.getItem(itemKey)).toEqual(null);
    });
  });

  afterAll(() => {
    localStorage.clear();
  });
});
