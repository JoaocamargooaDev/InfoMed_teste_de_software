*** Settings ***
Library    SeleniumLibrary

*** Variables ***
${URL}    https://www.saucedemo.com
${BROWSER}    chrome

*** Test Cases ***
CT01 Login válido
    Open Browser    ${URL}    ${BROWSER}
    Maximize Browser Window
    Input Text    id=user-name    standard_user
    Input Password    id=password    secret_sauce
    Click Button    id=login-button
    Page Should Contain    Products
    Sleep    3s
    Close Browser