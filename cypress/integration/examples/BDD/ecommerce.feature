Feature: End to End Ecommerce validation

    Application Regression

    Scenario: Ecommerce Products Delivery
        Given Opening Ecommerce Page
        When Add Items to Cart
        And Validate the total prices
        Then Select the country and verify Success message

    Scenario: Fill the form Details
        Given Opening Ecommerce Page
        When I Fill the form Details
            | name | gender |
            | bobs | Male   |
        Then Validate the entries
        And Click the shop Tab