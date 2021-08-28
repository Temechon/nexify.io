# Data model

## Root level collections
```mermaid
graph TD
root{ } --> courses & cod & users & access([access])
courses([courses]) --> c([chapters])
cod([codes])
users([users])

classDef collections fill:#0095ff,color:white;
class courses,cod,users,access,c collections;
```
## `access` collection
```mermaid
graph TD
access([access]) --> iduse[id] & userid[uid] & courseid & type

classDef ids fill:#00d68f,color:black;
classDef string fill:#ffaa00,color:black;
classDef collections fill:#0095ff,color:white;

class access collections;
class iduse,userid,courseid ids;
class type string;
```

## `courses` collection
```mermaid
graph TD
root{ } --> c
c([courses]) --> id
c --> name
c --> title
c --> author
c --> isPublic
c --> published
c --> obj[objectives] --- task
c --> pre[prerequesite] --- task
c --> hom[home] --- task
c --> cha([chapters])

task[[Task]] --> id2[id]
task --> title2[title]
task --> content2[content] --> cc{ }
cc --> type
cc --> value


classDef ids fill:#00d68f,color:black;
classDef string fill:#ffaa00,color:black;
classDef collections fill:#0095ff,color:white;

class c,cha,use collections;
class id,id2,iduse,userid ids;
class name,title,title2,type,value,typeuse,author string;

```

The subcollection **access** will link all users uid that can access to this course
(authors for example).

```mermaid
graph TD
root{ } --> c([courses]) --> chapters([chapters])
chapters --> id0[id]
chapters --> nextChapterId
chapters --> previousChapterId
chapters --> order
chapters --> title2[title]
chapters --> tasks --> t{ }
t --> id
t --> title3[title]
t --> content --> cc{ }
cc --> type
cc --> value

classDef ids fill:#00d68f,color:black;
classDef string fill:#ffaa00,color:black;
classDef collections fill:#0095ff,color:white;

class c,chapters collections;
class id0,id,nextChapterId,previousChapterId ids;
class order,title2,title3,type,value string;
```


```mermaid
graph TD
root{ } --> u
u([users]) --> id
u --> displayName
u --> email
u --> emailVerified
u --> uid
u --> photoURL

classDef ids fill:#00d68f,color:black;
classDef string fill:#ffaa00,color:black;
classDef collections fill:#0095ff,color:white;

class u collections;
class id,uid ids;
class displayName,email,emailVerified,photoURL string;
```

```mermaid
graph TD
root{ } --> codes
codes([codes]) --> id[id]
codes --> content2[content]
codes --> taskid
content2 --> TabCode{ }

TabCode --> id2[id]
TabCode --> name2[name]
TabCode --> classname
TabCode --> code


classDef ids fill:#00d68f,color:black;
classDef string fill:#ffaa00,color:black;
classDef collections fill:#0095ff,color:white;

class codes collections;
class id2,id,taskid ids;
class name2,classname,code string;

```