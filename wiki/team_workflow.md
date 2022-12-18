# Team, board work flow
Explain key aspects of the process inside the team.
## The atmosphere in the team
* We are distributed team so we try to use cameras during calls.
* We are a team of experienced developers.
* We are self-motivated, responsible for our work.
* We are trying to solve problems together, if someone has an issue with another part of the system (back, frontend), don't say "This problem not on my side". Organize a call and try to fix the issue together.
Add a comment to PR which describes the final decision and used as a note. 
* We do not create a long conversation with a list of comments for PR, we call the person and discuss solutions together.
* If there are many changes in code during the code review, or the solution not clear we call the developer and ask him to present his work.
* We do not implement requirements or fix bugs straightforward, if the solution is complex and required a huge rework of the team if there are easier solutions we discuss them with PM and QA to align our vision.
* Demo story or bug to QA before merging it to release branch and deploy on env (Optional)

## Story
### Assigned person
* Each story has a responsible person, this person should know all requirements of the story. QA and PM help to interpret requirements. 
* All questions about this story should be asked to the assigned person, QA helps to answer. This person controls the state of the story, if someone forgot to do this, do changes. 
* Assigned person makes a demo of his work, QA and other team members help to define the scenario.

### Product manager
* Add requirements
* Explain requirements to the team
### Scrum master
* Add story to the board
* Help to solve impediments 
* Control story state
### Developer
* Create tech design
* Process tasks
* Fix bugs
* Do review
* Change state of the story to **"Active", "Ready"**
### QA
* Help with requirements
* Cover with test cases
* Verify Bugs
* Change state of the story to **"Closed"**
### Tech lead
* Align vision with requirements
* Create/Review tech design
* Do review

### State
![alt text](./images//state.png)

* New - story analyzed, all requirements are clear.
* Active - at least one task in progress
* Ready - story implementation completed, deployed to test env.
* Closed - Implementation and manual testing done. [Automation has done if all tasks marked as completed]
 
## Board cards flows
<table>
    <tr>
        <th><b>To Do</b></th>
        <th><b>Active</b></th>
        <th><b>Review</b></th>
        <th><b>Done</b></th>
    </tr>
    <tr>
        <th colspan="5" style="text-align: left;"><b>Dev(QA) Task</b></th>
    </tr>
    <tr style="vertical-align: top;">
        <td>
            <u><i>No tasks in story</i></u>
            <p>-Read requirements of the story and validate if everything clear, if not discuss with team lead or QA</p>
            <p>-Check if ui design exists if required</p>
            <p>-If understanding of the story is clear, create Tech design task and move it in progress(Optional)</p>
            <p>-Set story state to Active</p>
            <u><i>New</i></u>
            <p>-Can be take in progress</p>
        </td>
        <td>
            <u><i>Start developing</i></u>
            <p>-Take task from To do</p>
            <p>-Assign to your self</p>
            <p>-Validate if task requirements is clear, clarify if required</p>
            <p>-<a target="_blank" href="#"> Create task branch</a> only if story is complex, if story is piece of cake than use story branch </p>
            <u><i>Developed</i></u>
            <p>-Test your task to be sure that code works</p>
            <p>-Push task branch to remote repository</p>
            <p>-Create pull request (PR)</p>
            <p>-Add title using pattern [Task Id]: Task title (3344: Add new popup)</p>
            <p>-Attach screenshot of your work (Frontend)</p>
            <p>-Assign reviewer as optional</p>
            <p>-Assign Task to PR</p>
            <p>-Make code review of yours PR by your self</p>
            <p>-Move task to Code review column</p>
            <p>-Send PR to Release conversation in developers channel, don't send raw link, use format: "@Dev1 [@Dev2]
                Please review PR", attach link to PR</p>
        </td>
        <td>
            <u><i>Start review</i></u>
            <p><u><i>Reviewer</i></u></p>
            <p>-Read story description</p>
            <p>-Read task description</p>
            <p>-Review code, we don't have requirement for the best code quality, so some minor issue can be
                skiped(naming etc)</p>
            <p>-Review code, try to detect issues in code first</p>
            <p>-Review code, style of the code should be similar to other places in the project</p>
            <p>-Review code, try do not impose your code style, respect that we are different persons and both solutions
                can be good</p>
            <p>-Make a call with Developer if code has many changes</p>
            <p>-If no comments, approve PR and notify Developer in conversation by "Like" the message with PR</p>
            <u><i>Developer</i></u>
            <p>-If no comments, move task to done</p>
            <p>-If you are not agree with comment, make a call with reviewer and discuss final solution, don't create
                big discussion in PR</p>
            <p>-If you agree with comments, fix them</p>
            <p>-Complete PR to the release or story branch</p>
            <p>-If it's final task in story, deploy story to release env</p>
            <p>-If it's final task in story, change state of the story to "Ready"</p>
            <p>-If it's final task in story, Notify in C2B Release Conversation that story can be tested, use Message: @tester1 [@tester2] Story [Number]: Title, completed, and deployed to [Env]</p>
        </td>
        <td>
           - Task finished
        </td>
    </tr>
    <tr>
        <th colspan="5" style="text-align: left;"><b>Bug</b></th>
    </tr>
    <tr style="vertical-align: top;">
        <td>
            <u><i>New</i></u>
            <p>-Can be take in progress</p>
        </td>
        <td>
            <u><i>Start developing</i></u>
            <p>-Read description, and align vision with Test engineer</p>
            <p>-Try to find optimal solution</p>
            <p>-Continue with task process</p>
        </td>
        <td>
            <u><i>Same as for task</i></u>
            <p><u><i>Developer</i></u></p>
            <p>-If Bug deployed, Set State to "Ready"</p>
            <p>-Notify in C2B Release Conversation that bug can be tested, use Message: Bug [Number]: Title fixed, and deployed to [Env]</p>
        </td>
        <td>
           <p>-If no Bugs, change state of the story to "Closed"</p>
        </td>
    </tr>
</table>

### Create Tech design task (Optional) 
* Create story branch, notify in chat if several people work on it
* Main goal of the task to create high level vision of the solution, align vision with teammate.
* If a story only front or backend, think about the solution and create new tasks for the story
* If a story contains both technologies, discuss with developer to align contracts and vision
* If a story contains both technologies, create tasks and assign specific tag "FE", "BE"
* Update description of the task with new or updated endpoints, request/response body
* If the story is complex add class diagrams
* If the story is complex make a demo for Team Lead and discuss the solution
* Create story branch if it does not exist using pattern feature/208482-title-of-the-story
* If the story small and can be done in one branch use it as the main
* Push story branch to the remote repository
* Create story env if backend affected
