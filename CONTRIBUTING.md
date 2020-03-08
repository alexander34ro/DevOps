## How to contribute to this repository
1.  Which repository setup will we use?
	
	For now, because the project is not expected to grow very large and in order to keep things simple we use a mono repository, storing everything in here without external resources or submodules.
	
2.  Which branching model will we use?
	
	As branching model, although it is not the most optimal way of branching, because the developer team is small and everyone works on separate parts of the project we will use a feature-branching model. In simpler words, create branch, develop feature, test it, merge branch.
	
3.  Which distributed development workflow will we use?
	For the same reasons stated above, we will follow a centralized workflow with incremental commits based on a "working" criteria.
![enter image description here](https://camo.githubusercontent.com/806f90354c9da68e8a2e6a99bc2b6d3278aee922/68747470733a2f2f6769742d73636d2e636f6d2f626f6f6b2f656e2f76322f696d616765732f63656e7472616c697a65645f776f726b666c6f772e706e67)

4.  How do we expect contributions to look like?

    Contributions should have a short, clear final commit message in the imperative form (i.e. "fix bug", "add feature") and a simple but exhaustive description in the pull request. Examples:
    
   >Related to Issue #
>**Problem**
>
>**Solution**
>
>**Testing**
>
>**Before** (screenshot and/or text)
>
>**After** (screenshot and/or text)

    

5.  Who is responsible for integrating/reviewing contributions?
	Review of contributions can be made by any member of the team, but integrating directly (i.e. merging into existing work) must be done by the team member responsible for that part of the project. 
	>For example, the person responsible with UI(Alice) can review a back-end related contribution and assign it to the person responsible with the back-end(Bob) to integrate. Alice shouldn't interfere in Bob's work, nor vice-versa.
