import { TestBed } from '@angular/core/testing';

import { ToasterService } from './toaster.service';
import { Spectator, SpectatorService } from '@ngneat/spectator/jest';
import { createServiceFactory } from '@ngneat/spectator/jest';
import { MessageService } from 'primeng/api';
import SpyInstance = jest.SpyInstance;

describe('ToasterService', () => {
  let spectator: SpectatorService<ToasterService>;
  let popSpy: SpyInstance;
  let addMessageSpy: SpyInstance;

  const createService = createServiceFactory({
    service: ToasterService,
    providers: [MessageService],
  });

  let messageServiceMock;
  beforeEach(() => {
    spectator = createService();
    messageServiceMock = spectator.inject(MessageService);

    popSpy = jest.spyOn(spectator.service, 'pop');
    addMessageSpy = jest.spyOn(messageServiceMock, 'add');
  });

  it('Should exist(smoke)', () => {
    expect(spectator).toBeDefined();
  });

  it('Should call messageService with success data', () => {
    spectator.service.success({
      title: 'Test title',
      content: 'Test content',
    });

    expect(popSpy).toHaveBeenCalledTimes(1);
    expect(popSpy).toHaveBeenCalledWith('success', {
      title: 'Test title',
      content: 'Test content',
    });
    expect(addMessageSpy).toHaveBeenCalledWith({
      severity: 'success',
      summary: 'Test title',
      detail: 'Test content',
    });
  });

  it('Should call messageService with info data', () => {
    spectator.service.info({
      title: 'Test title',
      content: 'Test content',
    });

    expect(popSpy).toHaveBeenCalledTimes(1);
    expect(popSpy).toHaveBeenCalledWith('info', {
      title: 'Test title',
      content: 'Test content',
    });
    expect(addMessageSpy).toHaveBeenCalledWith({
      severity: 'info',
      summary: 'Test title',
      detail: 'Test content',
    });
  });

  it('Should call messageService with error data', () => {
    spectator.service.error({
      title: 'Test title',
      content: 'Test content',
    });

    expect(popSpy).toHaveBeenCalledTimes(1);
    expect(popSpy).toHaveBeenCalledWith('error', {
      title: 'Test title',
      content: 'Test content',
    });
    expect(addMessageSpy).toHaveBeenCalledWith({
      severity: 'error',
      summary: 'Test title',
      detail: 'Test content',
    });
  });

  it('Should call messageService with warning data', () => {
    spectator.service.warning({
      title: 'Test title',
      content: 'Test content',
    });

    expect(popSpy).toHaveBeenCalledTimes(1);
    expect(popSpy).toHaveBeenCalledWith('warning', {
      title: 'Test title',
      content: 'Test content',
    });
    expect(addMessageSpy).toHaveBeenCalledWith({
      severity: 'warning',
      summary: 'Test title',
      detail: 'Test content',
    });
  });
});
