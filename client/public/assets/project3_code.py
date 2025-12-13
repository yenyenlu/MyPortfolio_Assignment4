import turtle

wn = turtle.Screen()
wn.title("Pong game")
wn.bgcolor("limegreen")
wn.setup(width=800, height=600)
wn.tracer(10)

# Score
score_deepskyblue = 0
score_red = 0

# Deepskyblue paddle
deepskyblue_paddle = turtle.Turtle()
deepskyblue_paddle.speed(0)
deepskyblue_paddle.shape("square")
deepskyblue_paddle.color("deepskyblue")
deepskyblue_paddle.penup()
deepskyblue_paddle.goto(-350, 0)
deepskyblue_paddle.shapesize(stretch_wid=5, stretch_len=1)

# red paddle
red_paddle = turtle.Turtle()
red_paddle.speed(0)
red_paddle.shape("square")
red_paddle.color("red")
red_paddle.penup()
red_paddle.goto(350, 0)
red_paddle.shapesize(stretch_wid=5, stretch_len=1)

# ball
ball = turtle.Turtle()
ball.speed(2)
ball.shape("circle")
ball.color("white")
ball.penup()
ball.goto(0, 0)
ball.dx = 2
ball.dy = 2

# pen
pen = turtle.Turtle()
pen.speed(0)
pen.color("white")
pen.penup()
pen.hideturtle()
pen.goto(0, 260)
pen.write("Deepskyblue: 0  Red: 0", align="center", font=("Courier", 24, "normal"))


# Function
def deepskyblue_paddle_up():
    y = deepskyblue_paddle.ycor()
    y += 20
    deepskyblue_paddle.sety(y)

def deepskyblue_paddle_down():
    y = deepskyblue_paddle.ycor()
    y -= 20
    deepskyblue_paddle.sety(y)

def red_paddle_up():
    y = red_paddle.ycor()
    y += 20
    red_paddle.sety(y)

def red_paddle_down():
    y = red_paddle.ycor()
    y -= 20
    red_paddle.sety(y)

# keyboard binding
wn.listen()
wn.onkeypress(deepskyblue_paddle_up, "Up")
wn.onkeypress(deepskyblue_paddle_down, "Down")
wn.onkeypress(red_paddle_up, "u")
wn.onkeypress(red_paddle_down, "d")

# Main game loop
while True:
    wn.update()
    
    # Move the ball
    ball.setx(ball.xcor() + ball.dx)
    ball.sety(ball.ycor() + ball.dy)
    
    # Border checking
    if ball.ycor() > 290:
        ball.sety(290)
        ball.dy *= -1
    
    if ball.ycor() < -290:
        ball.sety(-290)
        ball.dy *= -1
    
    if ball.xcor() > 390:
        ball.goto(0, 0)
        ball.dx *= -1
        score_deepskyblue += 1 
        pen.clear()
        pen.write("Deepskyblue: {}  Red: {}".format(score_deepskyblue,score_red), align="center", font=("Courier", 24, "normal"))
        
    if ball.xcor() < -390:
        ball.goto(0, 0)
        ball.dx *= -1
        score_red += 1
        pen.clear()
        pen.write("Deepskyblue: {}  Red: {}".format(score_deepskyblue,score_red), align="center", font=("Courier", 24, "normal"))

    # Paddle and ball collisions
    if (ball.xcor() > 340 and ball.xcor() < 350) and (ball.ycor() < red_paddle.ycor() + 40 and ball.ycor() > deepskyblue_paddle.ycor() - 40):
        ball.setx(340)
        ball.dx *= -1

    if (ball.xcor() < -340 and ball.xcor() < -350) and (ball.ycor() < red_paddle.ycor() + 40 and ball.ycor() > deepskyblue_paddle.ycor() - 40):
        ball.setx(-340)
        ball.dx *= -1

    # AI Player
    if red_paddle.ycor() < ball.ycor() and abs(red_paddle.ycor() - ball.ycor()) > 10:
        red_paddle_up()
    
    elif red_paddle.ycor() > ball.ycor() and abs(red_paddle.ycor() - ball.ycor()) > 10:
        red_paddle_down()