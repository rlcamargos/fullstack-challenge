from django.db import models
from django.db.models.fields import CharField, DateField, TextField
from django.db.models.fields.related import ForeignKey


class Order(models.Model):
    """
    This model is an entity that represents the orders made by the Real State Agencies
    """

    category = ForeignKey("Category", on_delete=models.CASCADE)
    contact_name = CharField(max_length=128)
    contact_phone = CharField(max_length=16)
    agency = CharField(max_length=128)
    company = CharField(max_length=128)
    deadline = DateField()
    description = TextField(blank=True, null=True)

    def __str__(self):
        return f"Order: {self.id} - {self.category} - {self.agency}"


class Category(models.Model):
    """
    This model is a property of the Order model that contains the info about an Order's category
    """

    name = CharField(max_length=128)

    def __str__(self):
        return self.name
