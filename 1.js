{
  ToolbarComponent(props) || (
    shouldShowStandardToolbar && (
      <Toolbar>
        {isFilterable && (
          <>
            <TextField
              className={classes.textField}
              fullWidth
              margin="dense"
              placeholder={labels.globalFilterPlaceholder}
              onChange={(event) =>
                debounceSetGlobalFilter(event.target.value)
              }
              variant="outlined"
            />
            <Box paddingLeft={2}>
              <ButtonGroup>
              {activeFilters
                .slice(0, maxFilterButtons)
                .map((column, index) =>
                  column.render("Filter", {
                    key: index,
                    labels: {
                      clear: labels.clearFilter,
                      clearAll: labels.clearAllFilters
                    }
                  })
                )}
                {hasMoreFilters &&
                      (FilterDrawerButtonComponent({
                        children: labels.allFilters
                      }) || (
                        <Button
                          color="primary"
                          onClick={() =>
                            setShowAdditionalFilters(
                              !shouldShowAdditionalFilters
                            )
                          }
                        >
                          {labels.allFilters}
                        </Button>
                      ))}
              </ButtonGroup>
            </Box>
          </>
        )}
      </Toolbar>
    )
  )
}