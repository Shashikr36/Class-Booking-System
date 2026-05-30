# Global Class Offering Booking System

## Project Overview

Global Class Offering Booking System is a backend service designed for a live-learning platform where teachers conduct online classes for students across different countries and time zones.

The system allows teachers to create courses, offerings (batches), and sessions, while parents can browse available offerings and book them. The application ensures that scheduling conflicts are prevented and session timings are displayed correctly in the user's local timezone.

Key challenges addressed:

* Multi-timezone scheduling
* Session conflict detection
* Offering-level booking
* Concurrent booking safety
* Transactional consistency

---

## Features

### Teacher Features

* Create and manage courses
* Create offerings (batches)
* Add sessions to offerings
* View offerings and sessions
* View upcoming sessions

### Parent Features

* View available offerings
* Book offerings
* View booked offerings
* View sessions in local timezone

### Booking Features

* Offering-level booking
* Duplicate booking prevention
* Session overlap detection
* Transaction-safe booking creation

### Platform Features

* UTC-based scheduling
* Timezone conversion
* Swagger API documentation
* DTO validation
* Global exception handling
* Prisma ORM integration

---

## Tech Stack

### Backend

* NestJS
* TypeScript

### Database

* PostgreSQL

### ORM

* Prisma ORM

### Validation

* class-validator
* class-transformer

### API Documentation

* Swagger

### Timezone Handling

* Luxon

---

## Project Structure

```text
src/
│
├── modules/
│   ├── auth/
│   ├── teacher/
│   ├── parent/
│   ├── course/
│   ├── offering/
│   ├── session/
│   ├── booking/
│
├── common/
│   ├── filters/
│   ├── utils/
│   └── decorators/
│
├── prisma/
├── config/
│
└── main.ts
```

---

## Database Schema Overview

### Teacher

Stores teacher information and timezone.

```text
Teacher
├── id
├── name
├── email
├── timezone
└── offerings
```

### Parent

Stores parent information and timezone.

```text
Parent
├── id
├── name
├── email
├── timezone
└── bookings
```

### Course

Represents a course template.

Examples:

* Python Coding
* Art Drawing
* Public Speaking

### Offering

Represents a schedulable batch of a course.

Examples:

* Saturday Batch
* Evening Batch
* Summer Camp Batch

### Session

Represents an actual meeting time.

```text
Offering
└── Sessions
    ├── startTimeUtc
    └── endTimeUtc
```

### Booking

Stores parent bookings.

```text
Parent
└── Booking
    └── Offering
        └── Sessions
```

---

## Entity Relationships

```text
Teacher
   │
   └── Offering
           │
           └── Session

Course
   │
   └── Offering

Parent
   │
   └── Booking
            │
            └── Offering
                    │
                    └── Session
```

---

## Environment Variables

Create a `.env` file in the root directory.

```env
DATABASE_URL="postgresql://username:password@localhost:5432/booking_system?schema=public"
```

Example:

```env
DATABASE_URL="postgresql://apple@localhost:5432/booking_system?schema=public"
```

---

## Setup Instructions

### 1. Clone Repository

```bash
git clone <repository-url>
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create `.env` and set:

```env
DATABASE_URL="postgresql://username:password@localhost:5432/booking_system?schema=public"
```

### 4. Run Database Migrations

```bash
npx prisma migrate dev
```

### 5. Generate Prisma Client

```bash
npx prisma generate
```

### 6. Start Development Server

```bash
npm run start:dev
```

Application will start on:

```text
http://localhost:3000
```

---

## Steps to Run the Application Locally

### Start PostgreSQL

```bash
brew services start postgresql@16
```

### Run Migration

```bash
npx prisma migrate dev
```

### Start Application

```bash
npm run start:dev
```

### Open Swagger Documentation

```text
http://localhost:3000/api
```

### Open Prisma Studio

```bash
npx prisma studio
```

---

## API Documentation

Swagger UI:

```text
http://localhost:3000/api
```

### Course APIs

```http
POST /courses
GET  /courses
```

### Teacher APIs

```http
POST /teachers
GET  /teachers
GET  /teachers/:id
GET  /teachers/:id/offerings
GET  /teachers/:id/sessions
GET  /teachers/:id/upcoming-sessions
```

### Offering APIs

```http
POST /offerings
GET  /offerings
```

### Session APIs

```http
POST /sessions
GET  /sessions
```

### Parent APIs

```http
POST /parents
GET  /parents
```

### Booking APIs

```http
POST /bookings
GET  /bookings
GET  /bookings/parent/:parentId
```

---

## Timezone Handling Approach

### Storage Strategy

All session times are stored in UTC.

Example:

```text
Teacher Input:
2026-06-07 06:00 PM Asia/Kolkata

Stored:
2026-06-07T12:30:00Z
```

### Display Strategy

Session times are converted from UTC to the parent's timezone when fetched.

Example:

```text
Stored UTC:
2026-06-07T12:30:00Z

Parent Timezone:
America/New_York

Displayed:
2026-06-07 08:30 AM
```

Benefits:

* Consistent storage
* Global timezone support
* Simplified conflict detection

---

## Conflict Detection Approach

Bookings occur at the offering level.

Before creating a booking:

1. Fetch all sessions belonging to the new offering.
2. Fetch all sessions already booked by the parent.
3. Compare every session pair.

Conflict rule:

```text
newStart < existingEnd
AND
newEnd > existingStart
```

If any overlap exists:

```text
Booking conflict detected
```

Booking is rejected.

---

## Concurrency Handling Approach

The booking workflow is executed inside a Prisma transaction.

```text
BEGIN TRANSACTION

1. Validate parent
2. Validate offering
3. Check duplicate booking
4. Check session conflicts
5. Create booking

COMMIT
```

Benefits:

* Atomic operations
* Data consistency
* Rollback on failure
* Reduced race condition risk

---

## Assumptions Made

1. Booking happens at the offering level, not at the session level.
2. An offering may contain one or more sessions.
3. Teachers create offerings in their own timezone.
4. All session times are stored in UTC.
5. Parents view session times in their configured timezone.
6. A parent cannot book overlapping offerings.
7. A parent cannot book the same offering twice.
8. Teacher and parent records already exist before creating offerings or bookings.

---

## Prisma Commands

Generate Prisma Client

```bash
npx prisma generate
```

Run Migration

```bash
npx prisma migrate dev
```

Open Prisma Studio

```bash
npx prisma studio
```

---

## Future Improvements

* JWT Authentication
* Role-based Authorization
* Redis Distributed Locking
* Docker Support
* Unit Testing
* Integration Testing
* CI/CD Pipeline
* Caching Layer

---

## Author

Shashi Kumar

B.Tech, IIT (BHU) Varanasi

GitHub: https://github.com/Shashikr36

LinkedIn: https://www.linkedin.com/in/shashi-kumar-iit
