from sqlalchemy import Column, Integer, String, Float, ForeignKey, Table
from sqlalchemy.orm import declarative_base, relationship

Base = declarative_base()

# links cars to the dealers that have them
car_dealer = Table(
    "car_dealer", Base.metadata,
    Column("car_id", ForeignKey("cars.id"), primary_key=True),
    Column("dealer_id", ForeignKey("dealers.id"), primary_key=True),
)

class Car(Base):
    __tablename__ = "cars"
    id = Column(Integer, primary_key=True)
    make = Column(String, nullable=False)
    model = Column(String, nullable=False)
    year = Column(Integer)
    price = Column(Integer, nullable=False)
    seats = Column(Integer)
    fuel = Column(String)
    transmission = Column(String)
    fuel_economy = Column(Float)
    dealers = relationship("Dealer", secondary=car_dealer, back_populates="cars")

class Dealer(Base):
    __tablename__ = "dealers"
    id = Column(Integer, primary_key=True)
    name = Column(String, nullable=False)
    city = Column(String)
    address = Column(String)
    latitude = Column(Float)
    longitude = Column(Float)
    phone = Column(String)
    cars = relationship("Car", secondary=car_dealer, back_populates="dealers")