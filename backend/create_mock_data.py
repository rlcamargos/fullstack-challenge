import random
import re
from datetime import datetime

import lorem
from django.db import connection

from fullstack_challenge.models import Category, Order

mocked_descriptions = re.split(r".[\n]+|\.\s", lorem.text())

mocked_data = [
    [
        "Hidráulica",
        "Alcides",
        "(11) 99999-9999",
        "Imobiliária Sampa",
        "Reparos S.A.",
        datetime(2021, 11, 10),
    ],
    [
        "Infiltração",
        "Moacir",
        "(48) 99999-9999",
        "Imobiliária Floripa",
        "Conserto Ltda",
        datetime(2021, 11, 14),
    ],
    [
        "Elétrica",
        "Ercildes",
        "(11) 99999-9999",
        "Imobiliária Floripa",
        "Conserto Ltda",
        datetime(2021, 11, 15),
    ],
    [
        "Retirada de mobília",
        "Adarci",
        "(11) 99999-9999",
        "Imobiliária Sampa",
        "Reparos S.A.",
        datetime(2021, 11, 15),
    ],
]

for data in mocked_data:
    Order.objects.create(
        category=Category.objects.create(name=data[0]),
        contact_name=data[1],
        contact_phone=data[2],
        agency=data[3],
        company=data[4],
        deadline=data[5],
        description=mocked_descriptions[random.randrange(len(mocked_descriptions))],
    )

# (Optional) Reset Order IDs to begin on 101 instead of 1

with connection.cursor() as cursor:
    cursor.execute(
        "UPDATE SQLITE_SEQUENCE SET SEQ=100 WHERE NAME='fullstack_challenge_order';"
    )

for order in Order.objects.all():
    order.id = None
    order.save()

Order.objects.filter(id__lte=100).delete()
