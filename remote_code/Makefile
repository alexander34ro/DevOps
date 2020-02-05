init:
	python -c "from minitwit_w_flagged import init_db; init_db()"

build:
	gcc flag_tool.c -l sqlite3 -o flag_tool -g

clean:
	rm flag_tool
