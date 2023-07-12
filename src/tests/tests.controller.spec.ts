import { Test, TestingModule } from '@nestjs/testing';
import { TestsController } from './tests.controller';
import { Request, Response } from 'express';
import { TestsService } from './tests.service';
import { BadRequestException } from '@nestjs/common';

describe('TestsController', () => {
  let controller: TestsController;
  let paymentsService: TestsService;

  const requestMock = {
    query: {},
  } as unknown as Request;

  const statusResponseMock = {
    send: jest.fn((x) => x),
  };

  const responseMock = {
    status: jest.fn((x) => statusResponseMock),
    send: jest.fn((x) => x),
  } as unknown as Response;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TestsController],
      providers: [
        {
          provide: TestsService,
          useValue: {
            createPayment: jest.fn((x) => x),
          },
        },
      ],
    }).compile();

    controller = module.get<TestsController>(TestsController);
    paymentsService = module.get<TestsService>(TestsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('paymentsService should be defined', () => {
    expect(paymentsService).toBeDefined();
  });

  describe('getPayments', () => {
    it('should return a status of 400', async () => {
      await controller.getPayments(requestMock, responseMock);
      expect(responseMock.status).toHaveBeenCalledWith(400);
      expect(statusResponseMock.send).toHaveBeenCalledWith({
        msg: 'Missing count or page query parameter',
      });
    });
    it('should return a status of 200 when query params are present', async () => {
      requestMock.query = {
        count: '10',
        page: '1',
      };
      await controller.getPayments(requestMock, responseMock);
      expect(responseMock.send).toHaveBeenCalledWith(200);
    });
  });

  describe('createPayment', () => {
    it('should throw an error', async () => {
      jest.spyOn(paymentsService, 'createPayment').mockImplementation(() => {
        throw new BadRequestException();
      });
      try {
        const response = await controller.createPayment({
          email: 'lorenzo@gmail.com',
          price: 100,
        });
      } catch (error) {
        console.log(error);
      }
    });
  });
});
