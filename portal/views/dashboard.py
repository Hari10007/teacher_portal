from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from portal.models import Student
from django.contrib.auth.decorators import login_required
from django.utils.decorators import method_decorator
from rest_framework import status


@method_decorator(login_required, name='dispatch')
class StudentListView(APIView):
    def get(self, request):
        students = Student.objects.filter(teacher=request.user)
        return render(request, 'dashboard/student_list.html', {'students': students})

@method_decorator(login_required, name='dispatch')
class AddStudentView(APIView):
    def post(self, request):
        name = request.POST.get('name')
        subject = request.POST.get('subject')
        marks = int(request.POST.get('marks'))
        teacher = request.user

        student, created = Student.objects.get_or_create(
            name=name, subject=subject, teacher=teacher,
            defaults={'marks': marks}
        )
        if not created:
            student.marks += marks
            student.save()

        return Response({'message': 'Student added/updated'})

@method_decorator(login_required, name='dispatch')
class UpdateStudentView(APIView):
    def patch(self, request, id):
        data = request.data
        name = data.get('name')
        subject = data.get('subject')
        marks = data.get('marks')
        teacher = request.user

        exists = Student.objects.filter(
            name=name, subject=subject, teacher=teacher
        ).exclude(id=id).exists()

        if exists:
            return Response({'error': 'Student with this name and subject already exists.'},
                            status=status.HTTP_400_BAD_REQUEST)
        try:
            student = Student.objects.get(id=id, teacher=teacher)
        except Student.DoesNotExist:
            return Response({'error': 'Student not found.'}, status=status.HTTP_404_NOT_FOUND)

        student.name = name
        student.subject = subject
        student.marks = marks
        student.save()

        return Response({'message': 'Student updated successfully'}, status=status.HTTP_200_OK)

@method_decorator(login_required, name='dispatch')
class DeleteStudentView(APIView):
    def delete(self, request, id):
        Student.objects.filter(id=id, teacher=request.user).delete()
        return Response({'message': 'Student deleted'}, status=status.HTTP_200_OK)
