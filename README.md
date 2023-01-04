# Energy-coach-remake
Mobile app remake from a final degree project. The original app was develop in React-Native. Back-end services consisted in Firebase and Python scripts in a Raspberry Pi. I was in charge of the remake and my project partner worked on the backend side.

## Some details about the original app
Source code from the original project:  https:/ /github.com/dsgarcia8/energy-coach

It was made in React-Native as part of a final degree project that focused on reducing energy consumption in a laboratory at ESPOL university without affecting the comfort of the students. The original app was made in 2021, and after the project was finished it was put aside, so when trying to deploy it up again we had a lot of problems and were unable to make it work. We decided that the best action course to take would be to redo it from scratch using the same source code.

Having a code base was a great advantage for the development of the application, however I had no experience in React-Native, so I had to learn from scratch. I learned and implemented in the app topics like React in general, some React Hooks, React Navigation and how to handle multiple screens, how to connect firebase and its products to a web application, how to develop a user interface that fits any screen (the original project does not it had this feature and was developed to fit a specific screen, the author's phone), and probably the most difficult, how to build a React-Native application using the React-Native CLI.

### Some screenshots from the app:
![Alt text](/Screenshots/LoginScreen.jpg?raw=true "Home Screen")
![Alt text](/Screenshots/HomeScreen.jpg?raw=true "Home Screen")
![Alt text](/Screenshots/ProfileScreen.jpg?raw=true "Home Screen")


## Some details about our version of the app
Our version of the app doesn't really change anything aesthetic-wise, just, as I mentioned, that it adjusts to any screen. On the other hand, logic-wise, our app now focuses on ensuring the comfort of people in an environment, where the only input variables will be: how the user feels at the moment (hot, cold or neutral), the air conditioning temperature and outdoor temperature. For the first variable, the comfort buttons were modified. Now pressing one counts as a vote that is counted in the database and after 15 minutes, it is compared which of the 3 values has the highest number of votes to perform an action that improves comfort. The latter is done in the backend, the application only registers the votes in the database.

So, this is as far as we are getting with the development of this application. After a month of development, it has become a bit complex to continue expanding due to hardware issues within the university, since we need to run it on an Android emulator, which consumes a lot of resources. This is why we decided to migrate to Reactjs on the web. In this application we are going to add some missing functionalities such as the use of a reinforcement learning mode to find the ideal comfort, as well as adding instructions for use so that people can understand what the application is about, and other functionalities that improve the UX. The web version of this app will be in this repository too so feel free to check it out. Its name will be Comfort++

Maybe I'll try some more React-Native later, in a new project. But this time I'll use **Expo**, which is a more beginner friendly platform.
