# Pickup Request Workflow Documentation

## Overview

The Transformer Cycle Hub pickup system implements a complete workflow for waste pickup requests with admin approval, user notifications, and activity tracking.

## Workflow Steps

### 1. User Submits Pickup Request

**Endpoint:** `POST /api/pickups`

**Request Body:**
```json
{
  "pickupDate": "2024-01-15",
  "pickupTime": "09:00 AM",
  "address": {
    "street": "123 Main St",
    "city": "Nairobi",
    "state": "Nairobi",
    "zipCode": "00100",
    "country": "Kenya"
  },
  "wasteType": "electronics",
  "estimatedWeight": 5.5,
  "description": "Old laptops and computer parts",
  "specialInstructions": "Please call before arrival",
  "isUrgent": false
}
```

**Response:**
```json
{
  "success": true,
  "message": "Pickup request submitted successfully",
  "data": {
    "_id": "pickup_id",
    "status": "pending",
    "user": "user_id",
    "pickupDate": "2024-01-15T00:00:00.000Z",
    "pickupTime": "09:00 AM",
    "wasteType": "electronics",
    "estimatedWeight": 5.5,
    "description": "Old laptops and computer parts",
    "createdAt": "2024-01-10T10:30:00.000Z"
  }
}
```

**What happens:**
- Pickup request is created with status "pending"
- Activity record is created for user dashboard
- Email notification is sent to admin
- User receives confirmation

### 2. Admin Reviews Pickup Request

**Endpoint:** `GET /api/pickups/pending` (Admin only)

**Response:**
```json
{
  "success": true,
  "count": 2,
  "data": [
    {
      "_id": "pickup_id",
      "user": {
        "_id": "user_id",
        "firstName": "John",
        "lastName": "Doe",
        "email": "john@example.com",
        "phone": "+254700000000"
      },
      "pickupDate": "2024-01-15T00:00:00.000Z",
      "pickupTime": "09:00 AM",
      "wasteType": "electronics",
      "estimatedWeight": 5.5,
      "description": "Old laptops and computer parts",
      "status": "pending",
      "createdAt": "2024-01-10T10:30:00.000Z"
    }
  ]
}
```

### 3. Admin Approves Pickup Request

**Endpoint:** `PUT /api/pickups/:id/approve` (Admin only)

**Request Body:**
```json
{
  "adminNotes": "Approved - will schedule pickup for requested time"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Pickup request approved successfully",
  "data": {
    "_id": "pickup_id",
    "status": "approved",
    "adminApprovedBy": "admin_user_id",
    "adminApprovedAt": "2024-01-10T11:00:00.000Z",
    "adminNotes": "Approved - will schedule pickup for requested time"
  }
}
```

**What happens:**
- Pickup status changes to "approved"
- Activity record is created for user
- Email notification is sent to user
- User dashboard is updated

### 4. Admin Rejects Pickup Request

**Endpoint:** `PUT /api/pickups/:id/reject` (Admin only)

**Request Body:**
```json
{
  "adminNotes": "Cannot pickup on requested date. Please reschedule for next week."
}
```

**Response:**
```json
{
  "success": true,
  "message": "Pickup request rejected successfully",
  "data": {
    "_id": "pickup_id",
    "status": "rejected",
    "adminApprovedBy": "admin_user_id",
    "adminApprovedAt": "2024-01-10T11:00:00.000Z",
    "adminNotes": "Cannot pickup on requested date. Please reschedule for next week."
  }
}
```

**What happens:**
- Pickup status changes to "rejected"
- Activity record is created for user
- Email notification is sent to user with rejection reason
- User dashboard is updated

### 5. Admin Completes Pickup

**Endpoint:** `PUT /api/pickups/:id/complete` (Admin only)

**Request Body:**
```json
{
  "actualWeight": 6.2
}
```

**Response:**
```json
{
  "success": true,
  "message": "Pickup completed successfully",
  "data": {
    "pickup": {
      "_id": "pickup_id",
      "status": "completed",
      "actualWeight": 6.2,
      "greenPointsEarned": 6,
      "completedAt": "2024-01-15T09:30:00.000Z"
    },
    "pointsEarned": 6,
    "totalGreenPoints": 156
  }
}
```

**What happens:**
- Pickup status changes to "completed"
- Actual weight is recorded
- Green points are calculated (1 point per kg)
- User's green points are updated
- Activity record is created
- Email notification is sent to user with completion details
- User dashboard is updated with new statistics

## User Dashboard Features

### 1. Dashboard Overview

**Endpoint:** `GET /api/activities/dashboard`

**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "user_id",
      "firstName": "John",
      "lastName": "Doe",
      "email": "john@example.com",
      "greenPoints": 156,
      "profilePicture": null
    },
    "statistics": {
      "totalPickups": 12,
      "totalWeight": 45.5,
      "monthlyPickups": 3,
      "monthlyWeight": 15.2,
      "monthlyPoints": 15,
      "unreadActivities": 2
    },
    "recentActivities": [
      {
        "_id": "activity_id",
        "type": "pickup_completed",
        "title": "Pickup Completed",
        "description": "Your pickup has been completed! We collected 6.2kg of waste and you earned 6 green points.",
        "pointsEarned": 6,
        "createdAt": "2024-01-15T09:30:00.000Z",
        "displayTime": "2 hours ago"
      }
    ],
    "pickupStats": {
      "pending": { "count": 1, "totalWeight": 0 },
      "approved": { "count": 2, "totalWeight": 0 },
      "completed": { "count": 9, "totalWeight": 45.5 },
      "rejected": { "count": 0, "totalWeight": 0 }
    }
  }
}
```

### 2. Recent Activities

**Endpoint:** `GET /api/activities`

**Response:**
```json
{
  "success": true,
  "count": 10,
  "unreadCount": 2,
  "data": [
    {
      "_id": "activity_id",
      "type": "pickup_completed",
      "title": "Pickup Completed",
      "description": "Your pickup has been completed! We collected 6.2kg of waste and you earned 6 green points.",
      "pointsEarned": 6,
      "isRead": false,
      "createdAt": "2024-01-15T09:30:00.000Z",
      "displayTime": "2 hours ago"
    }
  ]
}
```

### 3. Pickup History

**Endpoint:** `GET /api/activities/pickup-history`

**Response:**
```json
{
  "success": true,
  "data": {
    "docs": [
      {
        "_id": "pickup_id",
        "pickupDate": "2024-01-15T00:00:00.000Z",
        "pickupTime": "09:00 AM",
        "wasteType": "electronics",
        "estimatedWeight": 5.5,
        "actualWeight": 6.2,
        "status": "completed",
        "greenPointsEarned": 6,
        "createdAt": "2024-01-10T10:30:00.000Z",
        "completedAt": "2024-01-15T09:30:00.000Z"
      }
    ],
    "totalDocs": 12,
    "limit": 10,
    "page": 1,
    "totalPages": 2
  }
}
```

## Email Notifications

### 1. Admin Notification (New Pickup Request)
- Sent to admin when user submits pickup request
- Includes user details, pickup details, and action required

### 2. User Approval Notification
- Sent to user when admin approves pickup request
- Includes pickup details and next steps

### 3. User Rejection Notification
- Sent to user when admin rejects pickup request
- Includes rejection reason and suggestions

### 4. User Completion Notification
- Sent to user when pickup is completed
- Includes actual weight, points earned, and impact summary

## Activity Types

1. **pickup_request** - User submits pickup request
2. **pickup_approved** - Admin approves pickup request
3. **pickup_rejected** - Admin rejects pickup request
4. **pickup_completed** - Pickup is completed
5. **points_earned** - User earns green points
6. **login** - User logs in

## Waste Types

- electronics
- batteries
- plastics
- paper
- metal
- glass
- mixed

## Status Flow

1. **pending** - Initial status when request is submitted
2. **approved** - Admin approves the request
3. **rejected** - Admin rejects the request
4. **completed** - Pickup is completed

## Green Points System

- 1 green point per kg of waste collected
- Points are automatically calculated and awarded
- Points are added to user's total green points
- Activity records track all point earnings

## API Endpoints Summary

### User Endpoints
- `POST /api/pickups` - Submit pickup request
- `GET /api/pickups/my-pickups` - Get user's pickup requests
- `GET /api/pickups/:id` - Get specific pickup request
- `DELETE /api/pickups/:id` - Cancel pickup request
- `GET /api/activities` - Get recent activities
- `GET /api/activities/dashboard` - Get dashboard data
- `GET /api/activities/pickup-history` - Get pickup history
- `GET /api/activities/points-history` - Get points history
- `PUT /api/activities/mark-read` - Mark activities as read

### Admin Endpoints
- `GET /api/pickups` - Get all pickup requests
- `GET /api/pickups/pending` - Get pending pickup requests
- `GET /api/pickups/stats` - Get pickup statistics
- `PUT /api/pickups/:id/approve` - Approve pickup request
- `PUT /api/pickups/:id/reject` - Reject pickup request
- `PUT /api/pickups/:id/complete` - Complete pickup

## Security Features

- JWT authentication required for all endpoints
- Role-based authorization (admin vs user)
- Input validation for all requests
- Error handling and logging
- Email notifications for all status changes
- Activity tracking for audit trail

## Database Models

### Pickup Model
- User reference
- Pickup details (date, time, address, waste type, weight)
- Status tracking
- Admin notes and approval info
- Green points calculation

### Activity Model
- User reference
- Activity type and metadata
- Points earned
- Read/unread status
- Timestamps

### User Model
- Profile information
- Green points balance
- Role-based access control
- Activity tracking 