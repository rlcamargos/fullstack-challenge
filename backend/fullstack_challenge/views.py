from rest_framework import viewsets

from fullstack_challenge.models import Category, Order
from fullstack_challenge.serializers import CategorySerializer, OrderSerializer


class CategoryView(viewsets.ModelViewSet):
    serializer_class = CategorySerializer
    queryset = Category.objects.all()


class OrderView(viewsets.ModelViewSet):
    serializer_class = OrderSerializer
    queryset = Order.objects.all()
