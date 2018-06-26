# The GitHub Calendar Updater

### What does this app do?
The GitHub Calendar Updater allows developers to draw 8-bit art on their GitHub profile calendar of commits. By following these instructions, you too can doodle on your GitHub profile!

### Getting Started
In this repo, there are two important files - `gh-cal.js` and `ghcal.sh`

We begin with the contents of `gh-cal.js`

1.  Copy the entire contents of ```gh-cal.js```
2.  Navigate to your GitHub profile using Chrome. ```https://github.com/YOUR_NAME_HERE```
3.  Once your profile is loaded, open the Chrome JavaScript Console.
  
  (View --> Developer --> JavaScript Console -OR- CMD+Option+J on OSX)

4.  Paste the entire contents of ```gh-cal.js``` into your JavaScript Console and press enter
5.  Begin clicking on your GitHub profile calendar to create your 8-bit artwork! Clicking on a square cycles through 5 levels of color - Gray, light green, medium green, dark green, and very dark green.
6.  When you have completed your masterpiece, return to your JavaScript Console and paste the following commands in, following each by pressing ```Enter```:
  * painter.buildBashCountsArray();
  * painter.buildGitDatesArray();
  
7.  Open ```ghcal.sh``` in your favorite text editor.
8.  Copy/paste the output of ```painter.buildBashCountsArray();``` from your JavaScript Console into ghcal.sh on line 8.
9.  Copy/paste the output of ```painter.buildGitDatesArray();``` from your JavaScript Console into ghcal.sh on line 9.
10. Save your updated ```ghcal.sh```. In Bash, navigate to the directory that ghcal.sh lives in, and execute ```$ sh ghcal.sh```. This may take some time, as the script is writing thousands of timestamped git commits into a new repository in order to draw your art!
11. Once your Bash script completes, navigate to your new repository ```cd ../ghcal``` and push the repository to your GitHub.
12. Finally, bask in the glory of your handiwork! You're all set.

### Contributing
If you would like to contribute to this project, please open an [issue](../../issues) to start a discussion. I'm more than happy to review and accept pull requests for bugs and feature implementations, too.
