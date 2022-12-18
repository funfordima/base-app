The branching model is based on [GIT FLOW](https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow). 

# Usual flow 

### 1.1 Dev1 starts working on work item 1001 and creates a branch from develop:  

_develop -> feature/1001-title-of-ticket_  

### 1.2 Dev2 starts working on work item 1002 and creates a branch from develop:  

_develop -> feature/1002-title-of-ticket_ 

###2. After PRs were merged we can create a branch from develop branch to release the changes: 

_develop -> release/30_ 

Then deploy to QA or UAT and testing. 
We may fix any issues found during testing in the release branch. 
Devs may continue working on develop branch in parallel. 
 
###3. When release branch is ready to deploy on prod we merge it into master and develop:  

_release/30 -> master_ 
_release/30 -> develop_ 

Deploy changes on prod from the release branch.  

 

# Hot fix flow 

### 1. Dev starts working on work item 1003 and creates a branch from master: 
### 2. We may fix any issues found during testing in the hotfix branch. 
_master -> hotfix/1003-title-of-ticketDeploy to UAT and test._ 
###3. When the hotfix branch is ready to deploy on prod we merge it into master and develop: 

_hotfix/1003-title-of-ticket -> master_ 
_hotfix/1003-title-of-ticket -> develop_ 

 
### 4. Deploy changes on prod from the master branch. Now we can delete the hotfix branch. 

 

 

# Environments 

We have 2 environments pointed to the specific branches. 

Any change applied to _develop_ branch should be automatically deployed on the dev environment. 

Any change applied to _master_ branch should be manually deployed on the prod environment.

Other environments (**QA**, **UAT**, etc) might be deployed from any branch according to QA and devs needs for manual testing, load testing, etc. 

We don’t need **QA** and **UAT** branches anymore. 

 