from django.urls import path
from .views.auth import TeacherLoginView, TeacherLogoutView
from .views.dashboard import StudentListView, AddStudentView, UpdateStudentView, DeleteStudentView

urlpatterns = [
    path('login/', TeacherLoginView.as_view(), name='login'),
    path('logout/', TeacherLogoutView.as_view(), name='logout'),
    # path('signup/', TeacherSignupView.as_view(), name='signup'),
    # path('forgot_password/', TeacherForgotPassword.as_view(), name='forgot-password'),

    path('home/', StudentListView.as_view(), name='home'),
    path('add_student/', AddStudentView.as_view(), name='add-student'),
    path('update_student/<int:id>/', UpdateStudentView.as_view(), name='update-student'),
    path('delete_student/<int:id>/', DeleteStudentView.as_view(), name='delete-student'),   
    
]