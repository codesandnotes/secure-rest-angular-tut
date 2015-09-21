# secure-rest-angular-tut
A REST-querying AngularJS client that manages authentication, CORS and CSRF. For experimentation purposes, or to start new projects!

Having written this code for learning purposes, I have not included a grunt file. On the other hand the web app can be easily deployed on a server using your favorite IDE. 

For example, on IntelliJ IDEA: 

1) Open the "Run/Debug Configurations" window ("Edit Configurations...")

2) Add a new Local Jetty Server configuration (click on the +)

3) Name your configuration and click on the "Deployment" tab

4) Add an "Artifact" to be deployed at the server startup (if no artifacts have been defined yet, you either have to go through the "Project Structure" window or you have to click on "Fix" in the warning message below)

5) Add a "Web Application: Exploded" artifact using the + button, and name it "secure-rest-angular-tut"

6) In the "Output Layout" tab, click on the "+" button, select "Directory Content" and point it to the "secure-rest-angular-tut" folder. 

7) Click on the "Ok" button to go back to the "Run/Debug Configurations" window, and check "Use custom context root" so that the app is mapped on "http://localhost:8080/" instead of "http://localhost:8080/secure-rest-angular-tut". 

8) Run your configuration! 
