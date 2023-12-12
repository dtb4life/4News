React Native News App project, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli).


- [x] App Icon
- [x] App Splash Screen
- [x] OnBoarding Screen w/ Lottie Animations
  - [x] Page 1
  - [x] Page 2
  - [x] Page 3
- [x] Custom Inputs w/ full customization (still upgrading)
- [x] Custom Buttons w/ full customization (still upgrading)
- [x] Custom Modal w/ full customization (still upgrading)
- [ ] Screens
  - [x] SignIn
    - [x] SignIn as a Guest
  - [x] SignUp
    - [x] Terms of Use, Privacy Policy Bottom Sheets
    - [x] Full Validation
    - [x] User with this name/email already exists messages
  - [x] Forgot Password
    - [x] Full Validation
    - [x] User's not exist toast
    - [x] Lottie Animation  
  - [ ] New Password Screen
    - [x] Full Validation
    - [ ] Sending confirmation code via backend (in progress)
  - [x] Home Screen
    - [x] News Categories Search 
    - [x] Animated Image Carousel w/ categories
      - [x] Navigation to the screen w/ cards generated by chosen query
      - [x] Animated API
      - [x] Parallax effect   
    - [x] News cards
      - [x] News title, description, authors, date, etc.
      - [x] Read more with React WebView
      - [x] News sharing with title and url 
      - [x] Likes
        - [x] Not Registered block with Custom Modal Popup
        - [x] AsyncStorage integration
      - [x] Scrolling by news categories or by floating button
    - [x] Splash Screen
      - [x] Dynamic Typewriter Greetings to user
      - [x] Logo & Description Animations
    - [x] Page Refresh
  - [x] News Search Screen
    - [x] News Cards Shimmer placeholders 
    - [x] Search Bar
    - [x] Search Functionality
    - [x] Nothing found info
  - [x] Favorites Screen
    - [x] Saving News in database 
    - [x] Not Registered Block
    - [x] Deleting Favorites Functionality
    - [x] Favorites List Refresh (Auto & Manual)
    - [x] No Favorite News info
    - [x] Fetching Users Favorites data from Database or AsyncStorage
  - [x] Comments Screen
    - [x] News Data (image, title, publication date)
    - [x] Users comments UI
    - [x] Posting functionality
      - [x] 'No comments available' by using NoNewsInfo component 
      - [x] CustomDropDown component usage to pick options like Report, Delete, Share
        - [x] Custom ModalPopUp usage to confirm comment deleting (also checks user's identify value. For example, Admin can't report but can delete any comment or post, User can delete only posts or comment which were posted by himself, Guest can only report or share)
    - [x] Storing comments in database
  - [x] Community Screen
    - [x] Users News w/ comments, likes, date, etc.
      - [x] Refreshing functionality which gets all the data from database 
      - [x] Storing posts w/ author's info in a database
        - [x] Storing users likes, isLiked state & likes count
        - [x] Storing comments & comments count
      - [x] NewsFooter carousel component with pressable images of the university VK groups
        - [x] Causing huge error 'rendered fewer hooks than expected'. Possibly fixed it by refactoring NewsFooter component.
      - [x] Realtime publication date changing 
      - [x] UI
      - [x] Floating input container w/ opacity and etc. animations
      - [x] View w/ lottie animations and text inforamation. Shows when there are no available posts
      - [x] Optimizied cards by using user's phone dimensions   
    - [x] News Posting Functionality
    - [x] News Deleting providing w/ "Are you sure?" CustomModal
    - [x] Avoiding Guests posting providing w/ "You don't have permission" CustomModalPopUp   
- [x] Custom Drawer
  - [x] University Link
  - [x] View commit Link
  - [x] Feedback Screen with sending email-message functionality
  - [x] Rate Us with saving Users ratings in the database
  - [x] LogOut functionality
  - [x] Customization props with title, foreground color, background color, etc. 
 - [x] Weather Screen
   - [x] Search city
   - [x] Weakly forecast
   - [x] Lottie Animations
   - [x] Progress Loader
   - [x] Keyboard Avoiding Support   
   - [x] More Info
   - [x] Saving the city selected by the user in the database (or with ready to use async storage)
- [x] OnExit Custom ModalPopUp with Custom Buttons (triggered by a Backhandler event or when a button is pressed)
  - [x] Smooth Animation
  - [x] Yes, Cancel, Close Buttons
- [x] Sign In, Sign Up, etc. Forms validation via react-hook-forms
- [x] News API
  - [x] US News
    - [x] Categories Search
  - [X] RU News
    - [x] Categories Search
  - [x] Search functionality
  - [x] Global categories
    - [x] Fetching data from different domains
      - [x] Lenta.ru
      - [x] Habr.com
      - [x] Mail.ru
      - [x] Igromania.ru
      - [x] Kanobu.ru
      - [x] Gazeta.ru
      - [x] Vedomosti.ru
      - [x] Pikabu.ru
      - [x] Kommersant.ru
      - [x] Tass.ru
      - [x] IZ.ru
      - [x] Ixbt.com
      - [x] RG.ru
      - [x] Meduza.ru
      - [x] Interfax.ru
      - [x] LIFE.ru
      - [x] VZ.ru     
      - [x] Billboard
      - [x] Kinopoisk.ru
      - [x] Onliner.by
      - [x] F1NEWS.ru 
      - [x] Youtube.com
- [x] Custom hooks
  - [x] useUserCredentials
  - [x] useUserEmail
  - [x] useUserImage 
- [x] StatusBarManager 
- [x] SQLite Database Integration
- [x] Async Storage configuration
- [x] Bottom TabBar Navigation w/ material style
- [x] Proccessing Internet connection with YouTube alike info banners
- [x] Getting dimensions, tim, etc/
- [x] News Sharing functionality
- [x] MovieScreen
  - [x] Trending Movies
  - [x] Upcoming Movies
  - [x] Top Rated Movies 
  - [x] MovieScreen w/ movie info, cast, similar movies
  - [x] MoviePersonScreen person's info
  - [x] MovieSearchScreen
- [x] Admin Subsystem
  - [x] App statistics
    - [x] Users, Administrators, Posts, Likes, Saved news, Guests, Comments, Categories count
    - [x] Average app rating, The most popular city; Feedbacks, Saved movies count; Last registered user; Last liked movie;
  - [x] Database Tables (Users, Guests, Administrators, News, Categories, Likes, Comments, Rates, UserFavorites, likedMovies) (CRUD)
    - [x] Snap carousel
    - [x] Add/Update/Delete row functionality (providing w/ confirm/cancel buttons)
    - [x] Table export to the CSV format
  - [x] About App section w/ project description
  - [x] Refresh functionality      
    
  


# Ссылки

To learn more about React Native, take a look at the following resources:

- [React Native Website](https://reactnative.dev) - learn more about React Native.
- [Getting Started](https://reactnative.dev/docs/environment-setup) - an **overview** of React Native and how setup your environment.
- [Learn the Basics](https://reactnative.dev/docs/getting-started) - a **guided tour** of the React Native **basics**.
- [`@facebook/react-native`](https://github.com/facebook/react-native) - the Open Source; GitHub **repository** for React Native.
