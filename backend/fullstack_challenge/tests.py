from datetime import datetime

from django.test import TestCase

from fullstack_challenge.models import Category, Order


class OrderTestCase(TestCase):
    def setUp(self):
        Order.objects.create(
            category=Category.objects.create(name="Hidráulica"),
            contact_name="Alcides",
            contact_phone="(11) 99999-9999",
            agency="Imobiliária Sampa",
            company="Reparos S.A.",
            deadline=datetime.now().date(),
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec lorem justo, vulputate at ante vitae, pharetra laoreet nisl.",
        )

    def test_can_get_order(self):
        assert Category.objects.count() == 1
        assert Order.objects.count() == 1
        assert Order.objects.get().contact_name == "Alcides"
