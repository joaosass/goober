# Getting Started

To start the application locally, run the following commands:
- `npm install`
- `npm run dev` (The command `npm run dev` will copy the file .env.example to .env.development.local)

The application is hosted on Vercel, along with the Postgres database. You can access it [here](https://goober-nine.vercel.app/).
Spent time: 12 hours

## Decisions
Thinking about reducing the scope of the MVP, some functionality was cut from the first version. Firstly, the payment gateway, assuming that auth and user profiles were unnecessary. Implementing a payment gateway would introduce unnecessary complexity to the MVP because account creation and security measures would be required.
Another feature that was cut was the realtime feature. While researching more about websockets in the latest Next.js releases, I found some issues about the server running [inconsistently](https://github.com/vercel/next.js/issues/49334) and an [article by Vercel](https://vercel.com/guides/publish-and-subscribe-to-realtime-data-on-vercel) recommending alternate third-party solutions to achieve that. To avoid potential risks and save time, I opted to replace the websockets with simple request refetching in at intervals.
For productivity gains, I choose [Material UI](https://mui.com/material-ui/) for building the interface, [React-Query](https://tanstack.com/query/latest) for easy request handling and [Zustand](https://github.com/pmndrs/zustand) to manage the application's global state.
To separate the interface from the business logic I created several hooks to make the code cleaner and more flexible.
The UX was designed to be simple so that both driver and rider could complete a ride in just a few clicks.
The two main features implemented were a system to offer rides to drivers who have been without rides for the longest time and are within a 3 km radius of the rider. The other main feature was to calculate the price of the ride based on the distance and how many rides ocurred within 3 km radius of the rider in the last 30 minutes.

## Risks and unknowns
The main risks I noticed involve not implementing a way to ensure that the driver doesn't start/finish a ride without actually picking up the rider, the rider not paying the driver due to the lack of a payment gateway, and the lack of driver auth, allowing anyone could impersonate another driver by justing knowing their license plate.

## Next steps
- Auth
- Payment gateway
- Realtime communication
- Rating system
- Prevent false pickups

