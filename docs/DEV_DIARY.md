This file documents what I've learned making this project and what resources I used.

## Newly Learnt Key Concepts:

# Custom React Hooks:

    - Created custom React hooks to manage Windows and Resize handles

# System Theme Dependent Styling:

    - Implemented light/dark mode defaulting to the system theme

# Deployment:

    - TODO VERCEL
    - TODO CLOUDFLARE ALTERNATIVE

# Mobile Dev Tools:

    - Learnt how to use remote debugging to access browser dev tool on mobile devices

# Mobile/Tablet Compatibility:

    - Learnt how to add touch screen support for mobiles and tablets
    - Learnt the importance of viewport calculations and device categorisations

## Mistakes:

# Hardcoded Layouts:

    - I initially hardcoded my layouts leaving magic numbers everywhere. This resulted in making the website more difficult to maintain. I abstracted the magic numbers into constants/layouts.ts resulting in a more maintainable website. This was a mistake on my part which made long-term productivity suffer.

# Viewport Size:

    - I defaulted to using a desktop viewport at the start, which caused my portfolio's UI not functioning properly on mobiles and tablets. I implemented viewport calculations and device categorisation allowing compatbility with various device types. This should have been done from the start as not doing it significantly increased time spent making the website compatbile for smaller devices.

## Resources I Used:

### Development Tools and Debugging:

    - Chrome DevTools Remote Debugging (https://developer.chrome.com/docs/devtools/remote-debugging/)
    - Enabling Dev Options on Android (https://developer.android.com/studio/debug/dev-options)
    - Port Forwarding Tutorial by Web Dev Simplified (https://www.youtube.com/shorts/UUKugcJFoYc)

# React Concepts:

    - React Documentation on Refs (https://react.dev/learn/referencing-values-with-refs)
    - React Documentation on Touch Support (https://reactnat    ive.dev/docs/handling-touches)

# Animations:

    - Typewriter Effect in React (https://medium.com/@hamzamakh/typewriter-effect-in-react-a103a4f385c9)

# Code Quality and Best Practices:

    - Avoiding Magic Numbers by Web Dev Simplified (https://www.youtube.com/shorts/qADaSdE3sqE)

# Deployment and Hosting:

    - Custom Domains on Vercel (https://vercel.com/docs/domains)
    - Cloudflare Hosting Beneftis (https://developers.cloudflare.com/pages/)

# Flaticons for Various Logos:

    - Refer to CreditsWindow.tsx for the full list
