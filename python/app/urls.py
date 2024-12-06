from django.urls import path

from .views import AnagramView

urlpatterns = [
    path('<str:word>/', AnagramView.as_view(), name="find_all_anagrams"),
    ]
