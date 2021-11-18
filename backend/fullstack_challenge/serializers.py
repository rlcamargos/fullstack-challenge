from rest_framework import serializers

from fullstack_challenge.models import Category, Order


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ("id", "name")


class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = (
            "id",
            "category",
            "contact_name",
            "contact_phone",
            "agency",
            "company",
            "deadline",
            "description",
        )

    def create(self, validated_data):
        category = Category.objects.get(name=validated_data.pop("category")["name"])
        order = Order.objects.create(**validated_data, category=category)
        return order

    category = CategorySerializer()
