import json
from app.db import engine, SessionLocal
from app.models import Base, Car, Dealer

def seed():
    Base.metadata.drop_all(engine)
    Base.metadata.create_all(engine)

    with SessionLocal() as session:
        with open("app/data/cars.json") as f:
            cars = {c["id"]: Car(**c) for c in json.load(f)}
        session.add_all(cars.values())

        with open("app/data/dealers.json") as f:
            for d in json.load(f):
                car_ids = d.pop("car_ids", [])
                dealer = Dealer(**d)
                dealer.cars = [cars[i] for i in car_ids]
                session.add(dealer)

        session.commit()
        print(f"Inserted {session.query(Car).count()} cars, {session.query(Dealer).count()} dealers")

if __name__ == "__main__":
    seed()