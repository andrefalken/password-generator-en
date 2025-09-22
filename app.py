# Import modules to create of GUI
from PySide6.QtGui import QIcon
from PySide6.QtUiTools import QUiLoader
from PySide6.QtWidgets import QApplication

# Import the module that were created to generate the passwords
from password_generator import password_generator


class PasswordGenerator:
    """Class that generate the app."""
    def __init__(self):
        """Function who is responsible to start the class."""
        # Loading the GUI file
        loading = QUiLoader()

        # Loading the file at GUI
        self.ui = loading.load('./graphicalinterface/password_graphical_interface.ui')

        # Changing app title
        self.ui.setWindowTitle('Password generator')

        # Change app default icon
        self.ui.setWindowIcon(QIcon('./graphicalinterface/icon.png'))

        # Button that generate the password
        self.ui.pushButton.clicked.connect(self.password_generator)

    def password_generator(self):
        """Function responsible to generate random password"""
        # Get the quantity of password characters
        quantity = int(self.ui.characters_quantity_line.text())

        # Create the password
        password = password_generator(quantity)

        # Move the password at the right field
        password_field = self.ui.random_password_line
        password_field.setText(password)
        password_field.setReadOnly(True)        # Lock the password field only reading


if __name__ == '__main__':
    app = QApplication()
    interface = PasswordGenerator()
    interface.ui.show()
    app.exec()