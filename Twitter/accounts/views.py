from django.shortcuts import render,redirect
from django.contrib.auth import login, logout, authenticate
from django.contrib.auth.forms import AuthenticationForm, UserCreationForm

# Create your views here.
def login_view(request,*args,**kwargs):
    form = AuthenticationForm(request, data=request.POST or None)
    if form.is_valid():
        user_ = form.get_user()
        login(request, user_)
        return redirect("/")
    context = {
        "form":form,
        "title":"login",
        "btn_label":"login"
    }
    return render(request, "accounts/auth.html", context)

def logout_view(request,*args,**kwargs):
    if request.method == "POST":
        logout(request)
        return redirect("/login")
    context = {
            "form":None,
            "title":"Logout",
            "btn_label":"Logout?"
        }
    return render(request, "accounts/logout.html",context)

def register_view(request, *args, **kwargs):
    form = UserCreationForm(request.POST or None)
    if form.is_valid():
        user = form.save(commit=True)
        user.set_password(form.cleaned_data.get("password1"))

        # user_ = form.get_user()
        login(request, user)
        # print(form.cleaned_data)
        # username = form.cleaned_data.get("username")
        return redirect("/")
    context = {
            "form":form,
            "title":"Register",
            "btn_label":"Register"
        }
    return render(request, "accounts/auth.html",context)