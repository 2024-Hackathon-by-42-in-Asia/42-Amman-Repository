
SRC = emision.c

OFILES = $(SRC:.c=.o)

NAME = libmylib.so

all: $(NAME)
	

$(NAME): $(OFILES)
	gcc -shared -o $(NAME) $(OFILES)
	@python3 main.py
clean:
	rm -f $(OFILES)

fclean: clean
	rm -f $(NAME)

re: fclean all

.PHONY: re clean all fclean
