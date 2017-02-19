# CodePipeline Execution
This page describes how to use the Mocha tests demonstrated with [local execution](local.md) in a CI/CD setting using [AWS CodePipeline](https://aws.amazon.com/codepipeline/).

## Fork
Because CodePipeline will be pulling source code from GitHub, the first step is to fork this repo so you can later point CodePipeline to your copy of it.

## New Pipeline
Next, create a new pipeline from the [CodePipeline console](https://console.aws.amazon.com/codepipeline/home?region=us-east-1#/dashboard) by pressing the "Create pipeline button"

### Step 0
![Step 0](/img/codePipelineStep0.jpg)

### Step 1
In Step 1 give your new pipeline a name, such as serverlessToDoCICD:

![Step 1](/img/codePipelineStep1.jpg)

### Step 2
In Step 2, choose "GitHub" as the Source Provider and press the "Connect to GitHub" button:

![Step 2](/img/codePipelineStep2.jpg)

That will trigger the oAuth connection between CodePipeline and GitHub, after which select the repo created during the Fork you performed above and the master branch.

### Step 3
In Step 3, select "AWS CodeBuild" in the "Build provider" dropdown and "Create a new build project" giving it a name like "serverlesstoDoCICD":

![Step 3a](/img/codePipelineStep3a.jpg)

Further down the Step 3 page, select "Ubuntu" as the "Operating system", "Node.js" as the "Runtime", and select the latest version available.  

![Step 3b](/img/codePipelineStep3b.jpg)

Accept the other defaults and push the "Save build project" button before proceeding to Step 4.

### Step 4
In Step 4, select "No deployment" for the "Deployment provider":

![Step 4](/img/codePipelineStep4.jpg)

### Step 5
In our example, we're using CodePipeline together with CodeBuild [AWS CodeBuild](https://aws.amazon.com/codebuild/), which will create a container, insert the source from the repo, and execute commands found in the buildspec.yml file.  In our case, those commands are:

```yaml
version: 0.1
phases:
  install:
    commands:
      - npm install
  build:
    commands:
      - ./node_modules/.bin/serverless deploy --stage cicd | tee deploy.out
  post_build:
    commands:
      - ./test.sh
```

In other words, during the Install phase, our buildspec.yml file will use npm to install the dependencies we need.  During the Build phase, it will use the serverless command line to build and deploy the service, and during the Post-Build phase it will use the test.sh script to launch the tests.

In order to accomplish all that, we will have to apply an IAM role to our CodeBuild so that, in addition to having the permissions to operate correctly on all the AWS assets that CodePipeline will create, it also has all the permissions necessary to perform all those phases as described.  

So in Step 5, click on the "Create Role" button:

![Step 5a](/img/codePipelineStep5a.jpg)

That will launch a new browser tab that takes you to the IAM console so that the role can be created.  Select "Create a new IAM Role" in the "IAM Role" field and a name like "serverlessToDoCICD" in the "Role Name" field:

![Step 5b](/img/codePipelineStep5b.jpg)

When back on the Step 5 screen, the new role name will be filled in.  Before pressing the "Next Step" button to continue, though, we need to add some more policies to the IAM role so that the serverless and test commands will execute correctly.

**IN A SEPARATE BROWSER TAB** goto the IAM console and click on the newly created role (which will have "-service-role" appended to the name you gave it) to edit it, then click on the down arrow in the "Inline Policies" header on the "Permissions" tab so that more policies can be added manually:

![Step 5c](/img/codePipelineStep5c.jpg)

Click on the link to create a new Inline Policy and select Custom Policy:

![Step 5d](/img/codePipelineStep5d.jpg)

Then press the "Select" button.  In the next screen give, give your policy a name like "serverlessToDoPolicy" and copy/paste the contents of the serverlessToDoPolicy.json file that is part of the repo.

![Step 5e](/img/codePipelineStep5e.jpg)

Then press the "Apply Policy" button.  You can now go back to the Step 5 screen and press "Next Step".

### Step 6
Simply press the "Create Pipeline" button.

## Pipeline Execution
By default, your new pipeline will immediately begin executing and will consist of two stages that will look like this when completed:

![Completed Pipeline](/img/completedPipeline.jpg)

You can trigger subsequent executions automatically by committing code changes back to master or manually using the "Release Change" button.

In the CodeBuild stage, if you click on the "Details" link, a new browser tab will be launched showing the results of the build, which in our case will conclude with the successful passing of the Mocha tests:

![CodeBuild Details](/img/codeBuildDetails.jpg)

## Troubleshooting
If things go badly, you don't have access to the serverless command line to help you remove your CloudFormation stack the way you do locally, so if you run into issues you can start with a clean slate by going to the CloudFormation console and manually deleting the stack.  Be patient with that, though, as often there are things running in the background with those CloudFormation stacks that aren't obvious.  Once the stack is deleted, check to see if it took care of the DynamoDB table as well, which should be named 'todo-cicd'.  If that isn't deleted and you try again, the stack deployment will fail, citing a table name that already exists.
