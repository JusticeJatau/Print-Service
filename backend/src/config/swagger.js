const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Campus Print System API',
      version: '1.0.0',
      description: 'API documentation for Campus Print System - Online Print & Handout Ordering System',
      contact: {
        name: 'API Support',
        email: 'support@campusprint.com',
      },
      license: {
        name: 'MIT',
        url: 'https://opensource.org/licenses/MIT',
      },
    },
    servers: [
      {
        url: 'http://localhost:5000/api',
        description: 'Development server',
      },
      {
        url: 'https://api.campusprint.com/api',
        description: 'Production server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
      schemas: {
        Order: {
          type: 'object',
          properties: {
            orderId: { type: 'string', example: 'PRINT-123456-789' },
            customerInfo: {
              type: 'object',
              properties: {
                name: { type: 'string', example: 'John Doe' },
                phone: { type: 'string', example: '08012345678' },
                email: { type: 'string', example: 'john@example.com' },
              },
            },
            totalAmount: { type: 'number', example: 500 },
            status: { type: 'string', enum: ['pending', 'printing', 'ready', 'completed'] },
          },
        },
        Handout: {
          type: 'object',
          properties: {
            title: { type: 'string', example: 'Introduction to Computer Science' },
            course: { type: 'string', example: 'CS 101' },
            pageCount: { type: 'number', example: 45 },
            price: { type: 'number', example: 225 },
          },
        },
        Pricing: {
          type: 'object',
          properties: {
            blackAndWhite: {
              type: 'object',
              properties: {
                perPage: { type: 'number', example: 5 },
                doubleSidedDiscount: { type: 'number', example: 0.1 },
              },
            },
            color: {
              type: 'object',
              properties: {
                perPage: { type: 'number', example: 20 },
                doubleSidedDiscount: { type: 'number', example: 0.1 },
              },
            },
          },
        },
        Error: {
          type: 'object',
          properties: {
            success: { type: 'boolean', example: false },
            message: { type: 'string', example: 'Error message here' },
          },
        },
        // Add this inside the 'schemas' object in swagger.js

        File: {
        type: 'object',
        properties: {
            _id: { type: 'string', example: '507f1f77bcf86cd799439011' },
            originalName: { type: 'string', example: 'lecture_notes.pdf' },
            fileName: { type: 'string', example: 'prints/1702900000_lecture_notes.pdf' },
            fileUrl: { type: 'string', example: 'https://backblazeb2.com/bucket/prints/file.pdf' },
            fileSize: { type: 'number', example: 2048000 },
            mimeType: { type: 'string', example: 'application/pdf' },
            pageCount: { type: 'number', example: 45 },
            folder: { type: 'string', enum: ['prints', 'handouts'], example: 'prints' },
            createdAt: { type: 'string', format: 'date-time' },
        },
        },

        Transaction: {
        type: 'object',
        properties: {
            _id: { type: 'string' },
            orderId: { type: 'string' },
            amount: { type: 'number', example: 5000 },
            reference: { type: 'string', example: 'ref_abc123' },
            status: { type: 'string', enum: ['pending', 'success', 'failed'] },
            paidAt: { type: 'string', format: 'date-time' },
        },
        },

        PaymentInitRequest: {
        type: 'object',
        required: ['email', 'amount', 'orderId', 'customerName'],
        properties: {
            email: { type: 'string', example: 'customer@example.com' },
            amount: { type: 'number', example: 5000 },
            orderId: { type: 'string', example: 'PRINT-123456-789' },
            customerName: { type: 'string', example: 'John Doe' },
        },
        },

        PaymentInitResponse: {
        type: 'object',
        properties: {
            success: { type: 'boolean', example: true },
            data: {
            type: 'object',
            properties: {
                authorization_url: { type: 'string', example: 'https://paystack.com/pay/abc123' },
                reference: { type: 'string', example: 'ref_abc123xyz' },
            },
            },
        },
        },

        PaymentVerifyResponse: {
        type: 'object',
        properties: {
            success: { type: 'boolean', example: true },
            data: {
            type: 'object',
            properties: {
                status: { type: 'string', example: 'success' },
                amount: { type: 'number', example: 5000 },
                reference: { type: 'string', example: 'ref_abc123xyz' },
            },
            },
        },
        },

        UploadResponse: {
        type: 'object',
        properties: {
            success: { type: 'boolean', example: true },
            data: {
            type: 'object',
            properties: {
                fileId: { type: 'string', example: '507f1f77bcf86cd799439011' },
                fileName: { type: 'string', example: 'document.pdf' },
                fileUrl: { type: 'string', example: 'https://backblazeb2.com/prints/document.pdf' },
                pageCount: { type: 'number', example: 25 },
                fileSize: { type: 'number', example: 1048576 },
            },
            },
        },
        },
      },
    },
    tags: [
      { name: 'Auth', description: 'Authentication endpoints' },
      { name: 'Orders', description: 'Order management endpoints' },
      { name: 'Handouts', description: 'Handout management endpoints' },
      { name: 'Pricing', description: 'Pricing and calculation endpoints' },
      { name: 'Payments', description: 'Payment processing endpoints' },
      { name: 'Upload', description: 'File upload endpoints' },
      { name: 'Admin', description: 'Admin management endpoints' },
    ],
  },
  apis: ['./src/routes/*.js', './src/controllers/*.js'], // Path to the API routes
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;