## How to contribute to this repository
1.  Which repository setup will we use?
	
	For now, because the project is not expected to grow very large and in order to keep things simple we use a mono repository.
	
2.  Which branching model will we use?
	
	As branching model, although it is not the most optimal way of branching, because the developer team is small and everyone works on separate parts of the project we will use a no-branch model and work on the trunk(master) branch which will be merged into the release branch as new features are finished.
	
3.  Which distributed development workflow will we use?
	For the same reasons stated above, we will follow a centralized workflow with incremental commits based on a "working" criteria.
4.  How do we expect contributions to look like?

    Contributions should have a short, clear final commit message in the imperative form (i.e. "fix bug", "add feature") and a simple but exhaustive description in the pull request. Examples:
    >**vX.YZ-Title : Message**. Description must be in the pull request.
    >v0.13 - Refactor minitwit.py . Description : Refactored minitwit.py from py2 to py3 via 2to3 tool.

6.  Who is responsible for integrating/reviewing contributions?
	Review of contributions can be made by any member of the team, but integrating directly (i.e. merging into existing work) must be done by the team member responsible for that part of the project. 
	>For example, the person responsible with UI(Alice) can review a back-end related contribution and assign it to the person responsible with the back-end(Bob) to integrate. Alice shouldn't interfere in Bob's work, nor vice-versa.
