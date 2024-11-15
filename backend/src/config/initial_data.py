import logging

from sqlmodel import Session

from src.config.db import engine, init_db

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


def init() -> None:
    with Session(engine) as session:
        init_db(session)


def main() -> None:
    logger.info("Creando datos iniciales")
    init()
    logger.info("Datos iniciales creados")


if __name__ == "__main__":
    main()