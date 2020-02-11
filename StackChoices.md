We end up choosing  **Node + React + MongoDB**  as the final components for our stack. The reasons for this are both technical and non-tech:

-   better performance
-   modularity, which results in easier maintenance and more flexibility
-   very large community, meaning it's easy to find what we need and lots of people to answer questions, shall we have any
-   should we decide to do so, it would be easier to go cross-platform from this technology stack  
    Besides what's mentioned above, we're also more familiar with these technologies and they are considered by many to be the industry standard, so we see no reason to mess with success.
    Furthermore, we chose MongoDB over of SQLite, MySQL, or PostgreSQL because:
-   It's a popular database with a vibrant community
-   We have experience with it 
-   A schema free database seems appropriate for the job, more flexible than a schema-base DB

Other options that we have taken into consideration:

### Ruby + Rails + PostgreSQL

Ruby with Rails and PostgreSQL would be one way to go but we believe this stack is trying to do too much for our specific application. Ruby on Rails is an MVC framework, same as Flask, but comes with out-of-the-box support for a large number of features that we are not going to use.

**We disregarded this option as it adds too many redundant dependencies.**

### Python + Django + MySQL

Another possibility would be migrating our python + Flask application to the Django MVC framework. This would mean following a similar stack but has significantly lower support from the community compared to other solutions and doesn't integrate well with the most modern components.

**We disregarded this option as we believe it is not future-proof.**


Bonus:
[![85134541_2824004341002808_5208868592069640192_n](https://user-images.githubusercontent.com/24357659/74175630-79956400-4c36-11ea-924b-65330b9391f5.png)](https://user-images.githubusercontent.com/24357659/74175630-79956400-4c36-11ea-924b-65330b9391f5.png)

It seems like the twitter guys are currently using Node.js, Express and React as the technologies. It may be good to follow the industry best practices. Also, we need to do more research on these technologies and see the alternatives.

