const nodemailer = require('nodemailer');

// Create transporter
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Send order confirmation email
const sendOrderConfirmation = async (orderData) => {
  try {
    const { orderId, customerInfo, items, totalAmount } = orderData;
    
    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: customerInfo.email,
      subject: `Order Confirmation - ${orderId}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb;">Order Confirmation</h2>
          <p>Dear ${customerInfo.name},</p>
          <p>Your order has been received and is being processed.</p>
          
          <h3>Order Details:</h3>
          <p><strong>Order ID:</strong> ${orderId}</p>
          <p><strong>Date:</strong> ${new Date().toLocaleString()}</p>
          
          <h3>Items:</h3>
          <table style="width: 100%; border-collapse: collapse;">
            <tr style="background-color: #f3f4f6;">
              <th style="padding: 8px; text-align: left;">File</th>
              <th style="padding: 8px; text-align: left;">Pages</th>
              <th style="padding: 8px; text-align: left;">Copies</th>
              <th style="padding: 8px; text-align: left;">Price</th>
            </tr>
            ${items.map(item => `
              <tr style="border-bottom: 1px solid #e5e7eb;">
                <td style="padding: 8px;">${item.fileName}</td>
                <td style="padding: 8px;">${item.pages}</td>
                <td style="padding: 8px;">${item.copies}</td>
                <td style="padding: 8px;">₦${item.totalPrice}</td>
              </tr>
            `).join('')}
            <tr style="background-color: #f3f4f6; font-weight: bold;">
              <td colspan="3" style="padding: 8px; text-align: right;">Total:</td>
              <td style="padding: 8px;">₦${totalAmount}</td>
            </tr>
          </table>
          
          <h3>Pickup Information:</h3>
          <p>📍 Location: Campus Café, Main Building</p>
          <p>⏱ Ready in: 24 hours</p>
          <p>📱 Bring your Order ID for verification</p>
          
          <p>Track your order: <a href="${process.env.FRONTEND_URL}/orders?phone=${customerInfo.phone}">Click here</a></p>
          
          <p>Thank you for using CampusPrint!</p>
        </div>
      `,
    };
    
    if (customerInfo.email) {
      await transporter.sendMail(mailOptions);
      console.log(`Order confirmation email sent to ${customerInfo.email}`);
    }
  } catch (error) {
    console.error('Email send error:', error);
  }
};

// Send order status update email
const sendOrderStatusUpdate = async (orderId, customerEmail, customerName, status) => {
  try {
    const statusMessages = {
      pending: 'Your order is pending review',
      printing: 'Your order is now being printed',
      ready: 'Your order is ready for pickup!',
      completed: 'Your order has been completed',
    };
    
    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: customerEmail,
      subject: `Order ${orderId} Status Update`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb;">Order Status Update</h2>
          <p>Dear ${customerName},</p>
          <p><strong>${statusMessages[status] || `Status updated to ${status}`}</strong></p>
          <p>Order ID: ${orderId}</p>
          <p>Track your order: <a href="${process.env.FRONTEND_URL}/orders">Click here</a></p>
          <p>Thank you for using CampusPrint!</p>
        </div>
      `,
    };
    
    if (customerEmail) {
      await transporter.sendMail(mailOptions);
      console.log(`Status update email sent to ${customerEmail}`);
    }
  } catch (error) {
    console.error('Email send error:', error);
  }
};

// Send admin notification for new order
const sendAdminNotification = async (orderData) => {
  try {
    const adminEmail = process.env.ADMIN_EMAIL;
    
    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: adminEmail,
      subject: `New Order Received - ${orderData.orderId}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb;">New Order Received!</h2>
          <p><strong>Order ID:</strong> ${orderData.orderId}</p>
          <p><strong>Customer:</strong> ${orderData.customerInfo.name}</p>
          <p><strong>Phone:</strong> ${orderData.customerInfo.phone}</p>
          <p><strong>Total:</strong> ₦${orderData.totalAmount}</p>
          <p><strong>Items:</strong> ${orderData.items.length}</p>
          <p><a href="${process.env.FRONTEND_URL}/admin/orders">View Order in Admin Panel</a></p>
        </div>
      `,
    };
    
    await transporter.sendMail(mailOptions);
    console.log(`Admin notification sent to ${adminEmail}`);
  } catch (error) {
    console.error('Admin email error:', error);
  }
};

module.exports = {
  sendOrderConfirmation,
  sendOrderStatusUpdate,
  sendAdminNotification,
};