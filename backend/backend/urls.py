from django.contrib import admin
from django.urls import include, path
from rest_framework import routers

from fullstack_challenge.views import CategoryView, OrderView

router = routers.DefaultRouter()
router.register(r"orders", OrderView, "order")
router.register(r"categories", CategoryView, "category")

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/", include(router.urls)),
]
